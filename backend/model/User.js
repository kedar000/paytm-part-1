const mongoose = require("mongoose");

async function connectDB(){
    try {
        const connection = await mongoose.connect("mongodb+srv://KK:10396kkk@cluster0.ihiy3al.mongodb.net/paytm");
        console.log("db connect successfully....")
    } catch (error) {
        console.log("error in connecting db" , error);
    }
}

connectDB()
// user model foe the user schema 
const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true ,
        minLength : 3 ,
        maxLength : 30,
        trim : true,
        lowercase : true
   },
   firstname : {
        type : String ,
        require : true ,
        minLength : 3 , 
        maxLength : 20
   },
   lastname : {
    type : String , 
    require : true ,
    minLength : 3 ,
    maxLength : 20,
   },
   password : {
    type : String ,
    require : true,
    minLength : 6 , 
    maxLength : 20
   }
})


const accountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, // refference to user model 
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})


const Account = mongoose.model('Account' , accountSchema);
const User = mongoose.model("User" , userSchema);

module.exports = {
    User,
    Account
}