
const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../model/User");
const { route } = require("./account");
const { default: mongoose } = require("mongoose");
const router = express.Router();


router.get('/balance' , authMiddleware , async (req , res )=>{
    const account = await Account.findOne({
        userId : req.userId
    })
    console.log(typeof account);
    console.log(account.balance)
    res.json({
        mssg : account.balance 
    })
})


//general way not a bat idea 
/*router.post('/transfer' ,authMiddleware, async (req , res )=>{
    const { amount, to} = req.body;

    const accountholder = await Account.findOne({
        userId : req.userId
    })
    
    const {success} = await Account.findOne({
        userId : to
    })

    if(!success){
        res.status(400).json({
            mssg: "user does not exist "
        })
    }

    if(amount > accountholder.balance){
        res.status(400).json({
            mssg : "Insufficient balance "
        })
    }

    await Account.updateOne({
        userId : req.userId
    },{
        $inc : {
            balance : -amount
        }
    })

    await Account.updateOne({
        userId : to
    },{
        $inc : {
            balance : +amount
        }
    })

    res.status(200).json({
        mssg : "Transfered Successfully "
    })
}) */

//--------------------------------better way 


router.post('/transfer' , authMiddleware , async(req , res )=>{
    const session = await mongoose.startSession();

    session.startTransaction()

    const {amount , to } = req.body;
    
    const account = await Account.findOne({userId : req.userId}).session(session);


    //checking for sufficient balance 
    if(!account || account.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({
            mssg : "Insufficiant Balance "
        })
    }

    const toAccount = await Account.findOne({userId : to}).session(session);

    //checking whether the reciever user exist or not 
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            mssg : "Invalid Account "
        })
    }

    //performing the transation 
    await Account.updateOne({userId : req.userId},{$inc : {balance : -amount}}).session(session)
    await Account.updateOne({userId : to},{$inc : {balance : +amount}}).session(session)
    

    await session.commitTransaction()
    res.status(200).json({
        mssg : "Transfer Successfully"
    })
})

module.exports = router;