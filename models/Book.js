const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: false },
  genre: { type: String, required: false },
  image: { type: String, required: false }, 
    
});


module.exports = mongoose.model('Book', bookSchema);