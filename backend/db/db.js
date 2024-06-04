const mongoose = require("mongoose");


// connecting to the database 
async function connectDB(){
    try {
        const connection = await mongoose.connect("mongodb+srv://KK:10396kkk@cluster0.ihiy3al.mongodb.net/paytm");
        console.log("db connect successfully....")
    } catch (error) {
        console.log("error in connecting db" , error);
    }
}