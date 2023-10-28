const express = require('express')
const router = express.Router()  
categorycontroller = require("../controller/Category")

router.post("/",categorycontroller.addcategory);

module.exports=router