// the routes are defined using a routing mechanism that maps HTTP requests to specific actions or functionality
const express = require("express");
const {
  addBillsController,
  getBillsController,
} = require("../controller/billsController");

// router object
const router = express.Router();

// routers

// post Method
router.post("/add-bills", addBillsController);
// get Method
router.get("/get-bills", getBillsController);

module.exports = router;
