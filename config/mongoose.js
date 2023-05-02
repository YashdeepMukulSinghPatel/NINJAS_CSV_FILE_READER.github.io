const mongoose=require('mongoose');
const env=require('./environment');
const dotenv = require('dotenv').config();

//Set up default mongoose connection
var mongoDB =  process.env.MONGODB_URL;
module.exports = mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected to Database::mongoDB"));
