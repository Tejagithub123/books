const mongoose = require('mongoose');

const roles = ['admin', 'user'];
const uniqueValidator = require('mongoose-unique-validator');
const UsersSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastname: { type: String, required: false },
    firstname: { type: String, required: false },
    role: {
      type: String,
      enum: roles,
      required: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
  }
);

UsersSchema.plugin(uniqueValidator);



UsersSchema.virtual('name').get(function () {
  return (this.firstname || '') + ' ' + (this.lastname || '');
});

UsersSchema.methods.toPublic = function () {
  const userObject = this.toObject();
  delete userObject.password;
  userObject.name = this.name;
  return userObject;
};

module.exports = mongoose.model('Users', UsersSchema);
