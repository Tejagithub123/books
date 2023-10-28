const { default: mongoose } = require("mongoose");

const Category = require('../models/Category') 

exports.addcategory = async (req,res) => {
   category = new Category (req.body) 
   category.save()
   .then( () => {
        res.status(200).json({
     model : category,
     message : "category ajoutée"

        })   
      
      }) 
      
      .catch((error) => {
         res.status(400).json({
           error: error.message,
           message: "Données invalides",
         });
       });
   };
   