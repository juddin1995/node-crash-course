const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

// express app
const app = express();

// connect to mongodb
const dbURI =
  `mongodb+srv://jomiruddin112:${process.env.SECRET_PASSWORD}@nodetuts.pncf0.mongodb.net/nodetuts?retryWrites=true&w=majority&appName=nodetuts`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static iles
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send("<p>about page</p>");
  res.render("about", { title: "About" });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
