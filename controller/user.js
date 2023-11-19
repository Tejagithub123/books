const User = require("../models/Users") 

const jwt = require('jsonwebtoken') 

const bcrypt = require ("bcrypt") 

const Joi = require('joi');

exports.validateSignup = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    lastname: Joi.string(),
    firstname: Joi.string(),
    role: Joi.string().valid('admin', 'user'),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }


  next();
};

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      role: req.body.role,
    });

    user
      .save()
      .then((savedUser) => {
        const newUser = savedUser.toPublic();
        res.status(201).json({
          user: newUser,
          message: 'Utilisateur créé!',
        });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Login ou mot de passe incorrect' });
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Login ou mot de passe incorrect' });
          }

         res.status(200).json({
             token : jwt.sign({ userId: user._id }, "random_token_secret", {
                expiresIn: "24h",
         }), 
         
          })
        })
        .catch((error) => res.status(500).json({ error }));
    })
};