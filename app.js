const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Book = require("./models/Book");

const MONGODB_URI = "mongodb://127.0.0.1:27017/Book";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.post("/api/books", (req, res) => {
  const book = new Book(req.body);
  console.log(new Date());
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
});

app.get("/api/books", (req, res) => {
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
});

app.patch("/api/books/:id", (req, res) => {
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
});

app.get("/api/books/:id", (req, res) => {
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
});

app.delete("/api/books/:id", (req, res) => {
  //ne retourne rien
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
});

module.exports = app;
