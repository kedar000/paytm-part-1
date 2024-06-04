const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors())
app.use(express.json()); // body pasrser 
const mainRoute = require("./Routes/index"); // main route that takes to routes folder 
const { connectDB } = require('./db/db');

app.use('/api/v1' , mainRoute ) // api/v1 this is used because if we change or update the version then we need to only cha ge the v1 to v2 in the url these helps not to change the whole url and routes that are related to this url 


app.listen(3000);
console.log("server is running at the port 3000");

