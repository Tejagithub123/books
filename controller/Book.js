const Book = require("../models/Book");




exports.addbook = (req, res,next) => {
    const book = new Book(req.body);
   
    book
      .save()
      .then(() => {
        res.status(201).json({
          model: book,
          message: "objet cree",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Données invalides",
        });
      });
  };


  
  exports.getbooks = (req, res,next) => {
    Book.find()
      .then((books) => {
        res.status(200).json({
          model: books,
          message: "Success",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "probleme d'affichage",
        });
      });
  };
  
 exports.Updatebook = (req, res,next) => {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Objet non trouvé",
          });
        } else {
          res.status(200).json({
            model: book,
            message: "Objet modifié",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "probleme de mise à jour",
        });
      });
      
  };
  
 exports.getbook=  (req, res,next) => {
    Book.findOne({ _id: req.params.id })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Objet non trouvé",
          });
        } else {
          res.status(200).json({
            model: book,
            message: "Objet trouvé",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "probleme d'affichage",
        });
      });
  };
  
 exports.deletebook=(req, res,next) => {
    
    Book.findOneAndDelete({ _id: req.params.id })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Objet non trouvé",
          });
        } else {
          res.status(200).json({
            message: "Objet supprimé avec succès",
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Problème de suppression de l'objet",
        });
      });
  }; 



  exports.getbookAuthor = (req, res, next) => {
    const bookId = req.params.id; 
    Book.findById(bookId)
      .populate('author') 
      .exec()
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            message: "Livre non trouvé",
          });
        }
        res.status(200).json({
          model: book,
          message: "Success",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Problème d'affichage du livre",
        });
      });
  }; 


exports.getcategories = async (req,res)=>{
  const bookId = req.params.id; 
  Book.findById(bookId).populate('categories') 
.exec().then((book) => {
  if (!book) {
    return res.status(404).json({
      message: "auteur du livre",
    });
  }
  res.status(200).json({
    model: book,
    message: "Success",
  });
})
.catch((error) => {
  res.status(400).json({
    error: error.message,
    message: "Categories du livre",
  });
});
}; 
