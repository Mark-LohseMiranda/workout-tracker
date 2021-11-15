const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

const routes = require("./controllers")

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(routes)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });