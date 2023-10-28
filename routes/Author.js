const express = require('express');
const router = express.Router(); 

const authorontroller = require('../controller/Author');  

router.post("/",authorontroller.addAuthor)

module.exports=router