mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("../models/Users")
module.exports.loggedMiddleware = (req, res, next) => {
  
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "random_token_secret");
    const userId = decodedToken.userId;

    User.findOne({ _id: userId })
      .then((response) => {
        if (response) {
          req.auth = {
            userId: userId,
            role: response.role,
          };
          next();
        } else {
          res.status(401).json({ error: "User no trouvé" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: error.message,
        });
      });
  
    }

    module.exports.isAdmin = (req, res, next) => {
     try {
      if (req.auth.role === "admin") {
        next(); 
      } else {
        res.status(403).json({ message: "non Accès " });
      }
    } catch (e){
      res.status(403).json({ message: "erreur " })
    }

    };
