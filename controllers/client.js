const mongoose = require("mongoose");
const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.json(products);
      // console.log(products);
    })
    .catch((err) => console.log(err));
};

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
  // products: [
  //   {
  //     product: { type: Object, required: true },
  //     quantity: { type: Number, required: true },
  //   },
  // ],
  // cashInfo: {
  //   totalCash: { type: Number, required: true },
  //   // coupon: { type: String, required: true },
  //   // afterDiscount: { type: Number, required: true },
  //   // cashType: {type: String, required: true },
  //   isPaid: {type: Boolean, required: true}
  // },
  // date: {
  //   type: Date,
  //   required: true,
  // },
  // approveStatus: {
  //   type: Boolean,
  //   required: true,
  // },
  // hasAccountInfo: {
  //   userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  // },
  // deliveryInfo: {
  //   name: { type: String, required: true },
  //   email: { type: String, required: true },
  //   phoneNumber: { type: Number, required: true },
  //   address: { type: String, required: true },
  //   node: { type: String, required: true },
  // }
};
