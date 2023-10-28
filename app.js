const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Books = require("./routes/Book") 
const Authors = require("./routes/Author")
const Categories = require('./routes/Category')

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
app.use('/api/books',Books)

app.use('/api/author',Authors)

app.use('/api/category',Categories)

module.exports = app;
