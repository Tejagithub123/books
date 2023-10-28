const express = require('express');
const router = express.Router(); 

const bookontroller = require('../controller/Book');  

router.post("/",bookontroller.addbook)
router.get("/",bookontroller.getbooks)
router.patch ('/:id', bookontroller.Updatebook);
router.get('/:id', bookontroller.getbook);
router.delete('/:id', bookontroller.deletebook);

router.get('/author/:id',bookontroller.getbookAuthor); 
router.get('/Category/:id',bookontroller.getcategories);
module.exports=router