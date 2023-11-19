const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: false },
  genre: { type: String, required: false },
  image: { type: String, required: false }, 



  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', //nom modele
    },
  ],
    
  
}

); 



bookSchema.statics.findByAuthor = function (authorId) {
  return this.find({ author: authorId });
};

module.exports = mongoose.model('Book', bookSchema);