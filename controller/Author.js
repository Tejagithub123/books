const Author = require('../models/Author');


exports.addAuthor = async (req, res) => {
    const author = new Author(req.body);
    author
    .save()
    .then(() => {
      res.status(201).json({
        model: author,
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


