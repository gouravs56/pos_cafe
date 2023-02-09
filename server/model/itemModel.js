const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " name is required"],
    },
    price: {
      type: Number,
      required: [true, " price is required"],
    },
    category: {
      type: String,
      required: [true, " category is required"],
    },
    image: {
      type: String,
      required: [true, " image is required"],
    },
  },
  { timestamps: true }
);

const item = mongoose.model("item", itemSchema);
module.exports = item;
