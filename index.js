const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin');
const routes = require('./routes/router_test');

const MONGODB_URL = "mongodb+srv://admin:8888@cluster0.pi4yq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const Product = require("./models/product");


//Templace Engine EJS
//And point to views's folder
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
