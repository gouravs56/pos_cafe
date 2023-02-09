const billsModel = require('../model/billsModel');


// add/post item
const addBillsController = async(req,res) => {
    try {
        const newBill =new billsModel(req.body)
        await newBill.save()
        res.send("Bill Generated Successfully")
    } catch (error) {
        res.send("error")
        console.log(error);
        
    }
}

// get item
const getBillsController = async(req,res) => {
    try {
        const bills = await billsModel.find()
        res.status(200).send(bills);
    } catch (error) {
        console.log(error);
        
    }
} 
module.exports ={ addBillsController,getBillsController}