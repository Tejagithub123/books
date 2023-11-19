const express = require('express');
const router = express.Router(); 

const userontroller = require('../controller/user');  

router.post("/signup",userontroller.validateSignup,userontroller.signup)
router.post("/login",userontroller.login)

module.exports=router
