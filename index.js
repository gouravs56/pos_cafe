// packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); /* HTTP request logger middleware */
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const bodyParser = require("body-parser");  /* body-parser is a Node.js middleware library that is used to parse incoming request bodies */
const path = require('path');

// config .env file
dotenv.config();

// database connection
connectdb();

// rest objects
const app = express();

// middlewares
app.use(morgan("dev")); 
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(cors());
 
// routes
app.use('/api/item', require('./routes/itemRoute'));
app.use('/api/bills', require('./routes/billsRoute'));

// static files
<<<<<<< HEAD
app.use(express.static(path.join(__dirname,'/client/ui/dist')))
=======
app.use(express.static(path.join(__dirname,'./client/UI/dist')))
>>>>>>> 1e88054e9302db1f39882789f3a01aa0d45f4ac2
app.get('*', (req, res) => {
  res.sendFile (path.join(__dirname,'./client/UI/dist/index.html'))
});


// port
const PORT = 9000 || process.env.PORT; /* also included port in env file */

// listen
app.listen(PORT, () => {
   
  console.log(`App listening on port ${PORT}!`);
});
