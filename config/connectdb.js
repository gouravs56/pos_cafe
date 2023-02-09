const mongoose = require("mongoose");

 /* this bellow block is needed to eliminate strict querry warning */
mongoose.set(
    "strictQuery",
      false   );      

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,  /* It enables the use of the new URL parser for the MongoDB connection string. The new URL parser provides better handling of special characters in the connection string, improved security by limiting the options that can be passed in the connection string, and better performance */
      useUnifiedTopology: true,  /*  It enables the new unified topology layer in the driver, which provides a single, consistent API for interacting with MongoDB, regardless of the underlying deployment topology  */
    });
    console.log(`Server Running On ${mongoose.connection.host}`); 
  } catch (error) {
    console.log(`${error}`);
  }
};

module.exports = connectdb;
