const mongoose = require('mongoose');
const categories = ['horror','mystery','adventure','fantasy','romance','science-fiction','history']
const CategorySchema = mongoose.Schema({
  title: { type: String,
    enum: categories , required: false },
    
});


module.exports = mongoose.model('Category', CategorySchema);

