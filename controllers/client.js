const mongoose = require("mongoose");
const Product = require("../models/product");
const Order = require("../models/order");

/**
 * The method getProducts() implement geting product's data from database and respone to client
 * */
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json(products);
      // console.log(products);
    })
    .catch((err) => console.log(err));
};

/**
 * The method postClientOrder() implement geting order's data from client and store them into order database
 * */
exports.postClientOrder = (req, res, next) => {
  // const deleteMode = req.query.delete;
  // if (!deleteMode) {
  //   return res.redirect("/");
  // }
  // console.log("OK123");
  // console.log(JSON.stringify(req.body));
  // res.json("OK123456");
  

  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.number;
  const address =
    "〒" +
    req.body.postcode +
    "-" +
    req.body.addressFromPostCode +
    " " +
    req.body.inputAddress;
  const node = req.body.inputNode;
  const products = req.body.products;

  var totalCash = 0;
  products.forEach((item, index) => {
    totalCash += item.quantity * item.price;
  });

  const order = new Order({
    products: products,
    cashInfo: { totalCash: totalCash, isPaid: false },
    date: new Date(),
    approveStatus: false,
    hasAccountInfo: {userId: null},
    deliveryInfo:{
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      node: node
    }
  });

  order
  .save()
  .then((result) => {
    console.log(result);
    console.log('order successfully');
    res.send(result._id);
    // alert("Them thanh cong");
    // return res.redirect("/admin/manage/products");
  })
  .catch((err) => {
    console.log(err);
  });
};
