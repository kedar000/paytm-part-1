const express = require("express");
const zod = require('zod');
const { User } = require("../model/User");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const { Account } = require("../model/User");
const router = express.Router()

// zod schema for the signup post http request
const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    console.log(success);
    console.log("signup is called ");
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


//------------------------------------------------------------------------

// zod schema for signin 
const zodSigninCheck = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

// http request for the sign in 
router.post('/signin' , async(req , res )=>{
    const {success} = zodSigninCheck.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            mssg : "Incorrect input"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password 
    })

    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)

        res.json({
            token : token
        })
        return
    }

    res.status(411).json({
        mssg : "Error while logging in  "
    })
})
//------------------------------------------------------------------------

//zod schema for the update 
const zodUpdateSchema = zod.object({
    password : zod.string().min(6).nullable(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional()

})

// http put request for the update 
router.put('/', authMiddleware , async (req , res)=>{
    const updateUser = req.body;
    if(!zodSchemaCheck.safeParse (updateUser)){
        res.status(411).json({
            mssg : " password is too small "
        })
    }
    //update in database 
    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.status(200).json({
        mssg : "updated successfully"
    })
})

//------------------------------------------------------------------------

// http request for searching a user (reault should be the subStirng that contains the string entered by the user ) ie : like query present in mysql 
router.get('/bulk' , async(req, res )=>{

    // extracting the filter that is present in the query 
    const filter = req.query.filter || "";


    // search the user either by firstname or lastname (or operation is used )
    const user = await User.find({
        $or : [{
            firstname : {
                "$regex" : filter
            }

        },{
            lastname : {
                "$regex" : filter
            }
        }]
    })

    // returning all the user after the filter search
    res.json({
        user: user.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})


module.exports = router;

