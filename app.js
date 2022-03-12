require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.static("public"));

app.use("/auth", authRoute);

//mongo connect

const url = "mongodb://localhost:27017/bookswap";
mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("Connected to MONGODB");
});

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/about", function(req,res){
  res.render("about");
})

app.get("/login", async(req,res)=>{
  res.render("login");
})

app.get("/register", async(req,res)=>{
  res.render("register");
})

app.get("/dashboard", function (req, res) {
  res.render("dashboard");
});

app.get("/buybook", function (req, res) {
  res.render("dashboard");
});

app.post("/sellbook", function (req, res) {
  res.render("uploadBook");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started Successfully");
});
