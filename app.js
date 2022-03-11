require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/auth", authRoute);

//mongo connect

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/about", function(req,res){
  res.render("about");
})

app.get("/auth/login", async(req,res)=>{
  res.render("login");
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started Successfully");
});
