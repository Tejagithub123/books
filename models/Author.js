const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: false },
  nationality: { type: String, required: false },
    
});

module.exports = mongoose.model('Author', AuthorSchema);