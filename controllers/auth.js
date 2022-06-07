const User = require("../models/user");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

exports.getUserLogin = (req, res, next) => {
  res.render("auth/user-login", {
    pageTitle: "Login",
    path: "/login",
    oldInput: { loginId: "" },
    validationErrors: [],
    // isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postUserLogin = (req, res, next) => {
  // console.log('111111111');
  const email = req.body.email;
  const password = req.body.password;

  console.log(email);
  console.log(password);

  const errors = validationResult(req);

  console.log(JSON.stringify(errors));

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/user-login", {
      path: "/login",
      pageTitle: "Login",
      oldInput: { email: email },
      validationErrors: errors.array(),
    });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(422).render("auth/user-login", {
            path: "/login",
            pageTitle: "Login",
            oldInput: {
              email: email,
            },
            validationErrors: errors.array(),
          });
        } else {
          bcrypt
            .compare(password, user.password)
            .then((doMatch) => {
              if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save((err) => {
                  //Them save() y nghia la ngan cho res.redirect("/") hoat dong doc lap, vai page co the render truoc khi session duoc update
                  console.log(err);
                  res.redirect("/admin");
                });
              } else {
                return res.status(422).render("auth/user-login", {
                  path: "/login",
                  pageTitle: "Login",
                  oldInput: {
                    email: email,
                    password: "",
                  },
                  validationErrors: [
                    { param: "password", msg: "Mật khẩu không đúng!" },
                  ],
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.redirect("/user-login");
            });
        }
      })
      .catch((err) => {
        //   const error = new Error(err);
        //   error.httpStatusCode = 500;
        //   return next(error);
        console.log(err);
      });
  }
};

exports.postUserLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};