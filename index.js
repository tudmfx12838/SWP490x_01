const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require("path");
const cors = require("cors");

const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin');
const routes = require('./routes/router_test');

const MONGODB_URL = "mongodb+srv://admin:8888@cluster0.pi4yq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const Product = require("./models/product");

/**
 * The method fileStorage() setup a image's storage
 * */
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

/**
 * The method fileFilter() checking valid image's file type
 * */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || 
      file.mimetype === 'image/jpg' || 
      file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * The method cors() is added to middleware to fix error
 * */
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authortization');
//   res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
// }

/**
 * Templace Engine EJS
 * And point to views's folder
 * */
app.set("view engine", "ejs");
app.set("views", "views");

/**
 * Config bodyParser to get data from req.body
 * */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Add image's storage and fileFilter to setup uploading image's file and store to storage
 * */
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));  //image a name of image file at view edit-produt.ejs, {dest: 'images'} them folder luu tru

/**
 * Config static pat
 * */
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));

/**
 * Config router
 * */
app.use('/admin', adminRoutes);
app.use(clientRoutes);
app.use(routes);


/**
 * Config port and connect to database
 * */
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
