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
  Product.find()
    .then((products) => {
      // res.json(products);
      res.render("admin/admin-products", {
        pageTitle: "Login",
        path: "/login",
        products: products,
        // errorMessage: message,
        // oldInput: { loginId: "" },
        // validationErrors: [],
        // isAuthenticated: req.session.isLoggedIn,
        csrfToken: "", //req.csrfToken() //duoc cung cap boi goi csrfProtection trong middleware app.js
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const type = req.body.type;
  const price = req.body.price;
  const mount = req.body.mount;
  const description = req.body.description;

  // console.log('OK111111111111');
  // console.log(title);
  // console.log(type);
  // console.log(price);
  // console.log(mount);
  // console.log(description);

  const product = new Product({
    title: title,
    type: type,
    price: price,
    mount: mount,
    description: description,
    imageUrl: "abcdefgh",
  });

  product
    .save()
    .then((result) => {
      // alert("Them thanh cong");
      return res.redirect("/admin/manage/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  //Checking edit mode
  //http://localhost:4000/admin/manage/edit-product/?edit=true
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.body._id;
  const updatedTitle = req.body.title;
  const updatedType = req.body.type;
  const updatedPrice = req.body.price;
  const updatedMount = req.body.mount;
  const updatedDescription = req.body.description;

  Product.findById(productId)
    .then((product) => {
      console.log(product);
      product.title = updatedTitle;
      product.type = updatedType;
      product.price = updatedPrice;
      product.mount = updatedMount;
      product.description = updatedDescription;
      // product.imageUrl = updatedImageUrl;

      // if (image) {
      //   fileHelper.deleteFile(product.imageUrl);
      //   product.imageUrl = image.path;
      // }

      return product.save().then((result) => {
        console.log("Updated Product");
        res.redirect("/admin/manage/products");
      }); //Ham save nay cua mongoose
    })
    .catch((err) => {
      console.log(err);
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const deleteMode = req.query.delete;
  if (!deleteMode) {
    return res.redirect("/");
  }

  const productId = req.body._id.split(",");

  Product.deleteMany({ _id: productId })
  .then(result => {
    console.log("Delete complete");
    res.redirect("/admin/manage/products");
  })
  .catch(err => {
    console.log(err);
  });

};
