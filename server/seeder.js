// seeder is used to  populate a database with data
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const itemModel = require("./model/itemModel");
const item = require('./utils/data');

// config .env file
dotenv.config();

// database connection
connectdb();


// function seeder
const importData =async () => {
    try {
       await itemModel.deleteMany()
       const itemData = await itemModel.insertMany(item)
       console.log("All item added");
       
    } catch (error) {
        console.log(`${error}`);
        process.exit(1)  /* for exit with faliure */
    }
}

importData()