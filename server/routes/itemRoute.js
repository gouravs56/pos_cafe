const express = require('express');
const {  getItemController, addItemController, editItemController ,deleteItemController } = require('../controller/itemController');

// router object
const router = express.Router()

/* routers:Each route typically defines a specific HTTP verb (GET, POST, PUT, DEL) and a path,
and is associated with a function that is executed when the route is accessed. */

// get Method
router.get('/get-item',getItemController)

// post Method
router.post('/add-item',addItemController)

//update/edit Method
router.put('/edit-item',editItemController)

//update/edit Method
router.post('/delete-item',deleteItemController)



module.exports = router /* to export one or more objects, functions, or values from a module "module.exports" is used */
