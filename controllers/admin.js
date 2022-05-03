const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Event = require("../models/event");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json(products);
      // console.log(products);
    })
    .catch((err) => console.log(err));
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
      // console.log(users);
    })
    .catch((err) => console.log(err));
};

exports.getEvents = (req, res, next) => {
  Event.find()
    .then((events) => {
      res.json(events);
      // console.log(events);
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Event.find()
      .then((orders) => {
        res.json(orders);
        // console.log(orders);
      })
      .catch((err) => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  res.render("admin/admin-products", {
    pageTitle: "Login",
    path: "/login",
    // errorMessage: message,
    // oldInput: { loginId: "" },
    // validationErrors: [],
    // isAuthenticated: req.session.isLoggedIn,
    csrfToken: ''//req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
  });
  // Product.find()
  //   .then((products) => {
  //     res.json(products);
  //     // console.log(products);
  //   })
  //   .catch((err) => console.log(err));
};