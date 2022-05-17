const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require("path");

const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin');
const routes = require('./routes/router_test');

const MONGODB_URL = "mongodb+srv://admin:8888@cluster0.pi4yq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const Product = require("./models/product");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // const date = new Date().now();
    // console.log(new Date().toISOString());
    cb(null, file.originalname);
    // cb(null, (new Date().toISOString()) + '-' + file.originalname); //(new Date().toISOString())
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || 
      file.mimetype === 'image/jpg' || 
      file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Templace Engine EJS
//And point to views's folder
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));  //image a name of image file at view edit-produt.ejs, {dest: 'images'} them folder luu tru

app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));

app.use('/admin', adminRoutes);
app.use(clientRoutes);
app.use(routes);



mongoose
  .connect(
    MONGODB_URL, {dbName: 'myShopDB'}
  )
  .then((result) => {
    app.listen(4000);
    console.log('App listening on port 4000')
  })
  .catch((err) => {
    console.log(err);
  });
