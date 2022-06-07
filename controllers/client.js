const mongoose = require("mongoose");
const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

const bcrypt = require("bcryptjs");

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
    hasAccountInfo: { userId: null },
    deliveryInfo: {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      node: node,
    },
  });

  order
    .save()
    .then((result) => {
      console.log(result);
      console.log("order successfully");
      res.send(result._id);
      // alert("Them thanh cong");
      // return res.redirect("/admin/manage/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCheckEmailExist = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const email = req.body.email;
  // User.findOne()
  User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) {
        res.send(false);
        console.log("not exist");
      } else {
        res.send(true);
        console.log(" exist");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.postClientLogin= (req, res, next) => {
  console.log(JSON.stringify(req.body));
}

exports.postClientSignup = (req, res, next) => {
  console.log(JSON.stringify(req.body));

  const email = req.body.email;
  const password = req.body.password;
  const permission = "user";
  const name = req.body.name;
  const doB = req.body.doB;
  const phoneNumber = req.body.phoneNumber;
  const address = "〒" + req.body.postcode + " - " + req.body.address;

  //   var imageUrl = "";
  //   // console.log(req.file);
  //   if (!image) {
  //     imageUrl = "images/avatar.jpg";
  //   } else {
  //     imageUrl = image.path;
  //   }
  var imageUrl = "images/avatar.jpg";

    bcrypt
      .hash(password, 12) //Ma hoa pw thanh ma hash, agr2 la so vong bam, gia tri cang cao cang ton tgian nhung  cang an toan, 12 la du
      .then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          permission: permission,
          name: name,
          doB: doB,
          phoneNumber: phoneNumber,
          address: address,
          point: 0,
          imageUrl: imageUrl,
          cart: { items: [] },
          orderHistory: [],
          available: true,
        });
        return user.save();
      })
      .then((result) => {
        return res.send({msg: "Đăng ký tài khoản thàng công"});
        // console.log(email);
        // return transporter.sendMail({
        //   to: email,
        //   from: "tudmfx12838@funix.edu.vn",
        //   subject: "Signup succeeded!",
        //   html: '<h1>You successfully signed up!<a href="http://localhost:3000/">Click here to return!</a></h1>',
        // });
      })
      .catch((err) => {
        console.log(err);
        // const error = new Error(err);
        // error.httpStatusCode = 500;
        // return next(error);
      });
};

exports.getCSRFToken = (req, res, next) => {
  res.json({ CSRFToken: req.csrfToken() });
  // res.cookie('XSRF-TOKEN', req.csrfToken());
  // app.all('*', function (req, res) {
  //   res.cookie('XSRF-TOKEN', req.csrfToken())
  //   res.render('index')
  // })
};
