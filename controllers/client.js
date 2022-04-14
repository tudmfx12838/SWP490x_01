const mongoose = require("mongoose");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
        res.json(products);
        // console.log(products);
    })
    .catch((err) => console.log(err));
};
