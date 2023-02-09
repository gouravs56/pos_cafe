// a controller is a JS module that defines the logic for handling specific actions in a web apps  
const itemModel = require('../model/itemModel');

// get item
const getItemController = async(req,res) => {
    try {
        const item = await itemModel.find()
        res.send(item);
    } catch (error) {
        console.log(error);
        
    }
}
// add/post item
const addItemController = async(req,res) => {
    try {
        const newItem =new itemModel(req.body)
        await newItem.save()
        res.send("Item Added Successfully")
    } catch (error) {
        res.status(400).send("error", error)
        console.log(error);
        
    }
}
// edit/update item
const editItemController = async(req,res) => {
    try {
        await itemModel.findOneAndUpdate({_id:req.body.itemId},req.body)
        res.status(201).send("Item Edited Successfully")
    } catch (error) {
        res.status(400).send("error", error)
        console.log(error);
        
    }
}
// delet e item
const deleteItemController = async(req,res) => {
    try {
        const {itemId}= req.body
        await itemModel.findOneAndDelete({_id: itemId})
        res.status(200).send("Item Deleted Successfully")
    } catch (error) {
        res.status(400).send("error", error)
        console.log(error);
        
    }
}


module.exports ={ getItemController,addItemController,editItemController ,deleteItemController}