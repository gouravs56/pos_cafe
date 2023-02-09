const mongoose = require("mongoose");

const billsSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, " name is required"],
    },
    customerNumber: {
      type: Number,
      required: [true, " price is required"],
    },
    subTotal: {
      type: Number,
      required: [true, " price is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, " price is required"],
    },
    tax: {
      type: Number,
      required: [true, " price is required"],
    },
    payMode: {
      type: String,
      required: [true, " category is required"],
    },
  
    cartItem: {
      type: Array,
      required: [true, " category is required"],
    },
    date: {
      type: Date,
      default:Date.now()
    },
  },
  { timestamps: true }
);

const Bills = mongoose.model("bills", billsSchema);
module.exports = Bills;
