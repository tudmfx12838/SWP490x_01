const mongoose = require("mongoose");
const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");
const Event = require("../models/event");

const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const session = require("express-session");
const MongoDbStote = require("connect-mongodb-session")(session);

const MONGODB_URL =
  "mongodb+srv://admin:8888@cluster0.pi4yq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const store = new MongoDbStote({
  uri: MONGODB_URL,
  collection: "sessions",
  databaseName: "myShopDB",
  // expires: 1000 * 60 * 60,
  // expires  them vao de tu xoa sau het phien
});

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
      // "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",
    },
  })
);

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
  const sessionId = req.body.sessionId;
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.number;
  // const imageUrl = req.body.imageUrl;
  const address =
    "〒" +
    req.body.postcode +
    "-" +
    req.body.addressFromPostCode +
    " " +
    req.body.inputAddress;
  const node = req.body.inputNode;
  const products = req.body.products;
  const couponName = req.body.coupon.name;
  const couponDiscount = req.body.coupon.discount;

  var totalCash = 0;
  products.forEach((item, index) => {
    totalCash += item.quantity * item.price;
  });

  const afterDiscount = totalCash - totalCash * couponDiscount;
  var userId = null;

  if (sessionId) {
    store.get(sessionId, (error, session) => {
      if (error) {
        console.log(error);
      } else {
        if (session !== null) {
          userId = session.user._id;

          const order = new Order({
            products: products,
            cashInfo: {
              totalCash: totalCash,
              coupon: { name: couponName, discount: couponDiscount },
              afterDiscount: afterDiscount,
              isPaid: false,
            },
            date: new Date(),
            approveStatus: false,
            hasAccountInfo: { userId: userId },
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
            .then((resultOrder) => {
              User.findOne({ _id: userId })
                .then((user) => {
                  if (user !== null) {
                    user.orderHistory.push({
                      orderId: mongoose.Types.ObjectId(resultOrder._id),
                    });
                    user
                      .save()
                      .then((result) => {
                        console.log(user);
                      })
                      .catch((err) => console.log(err));
                  }
                })
                .catch((err) => console.log(err));

              // console.log(resultOrder);
              console.log("order successfully");
              res.send({hasAccount: true, order: resultOrder, inform: resultOrder._id});
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    });
  } else {
    const order = new Order({
      products: products,
      cashInfo: {
        totalCash: totalCash,
        coupon: { name: couponName, discount: couponDiscount },
        afterDiscount: afterDiscount,
        isPaid: false,
      },
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
      .then((resultOrder) => {
        console.log(resultOrder);
        console.log("order successfully");
        res.send({hasAccount: false, order: null, inform: resultOrder._id});
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.postCheckEmailExist = (req, res, next) => {
  // console.log(JSON.stringify(req.body));
  const email = req.body.email;
  // User.findOne()
  User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) {
        res.send(false);
        // console.log("not exist");
      } else {
        res.send(true);
        // console.log(" exist");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCheckCouponExist = (req, res, next) => {
  // console.log(JSON.stringify(req.body));
  const coupon = req.body.coupon;
  // User.findOne()
  Event.findOne({ coupon: coupon })
    .then((eventDoc) => {
      if (!eventDoc) {
        res.send({
          result: "false",
          inform: "Mã giảm giá không tồn tại",
          discount: 0,
        });
        // console.log("not exist");
      } else {
        const startDate = Date.parse(eventDoc.startDate);
        const endDate = Date.parse(eventDoc.endDate);
        const nowOfTime = Date.now();
        if (startDate < nowOfTime && nowOfTime < endDate) {
          res.send({
            result: "true",
            inform:
              "Bạn có thể sử dụng mã giảm giá này \nNội dung: " +
              eventDoc.description,
            discount: eventDoc.discount,
          });
        } else {
          res.send({
            result: "expired",
            inform: "Mã giảm giá đã hết hạn",
            discount: 0,
          });
        }
        // console.log("startDate " + startDate + " , endDate " + endDate + " ,  nowOfTime" + nowOfTime);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postGetOrderHistoryByOrderId = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const orderId = req.body.orderId;  //mongoose.Types.ObjectId(req.body.orderCode);

  // User.findOne()
  Order.findById(orderId)
    .then((orderDoc) => {
      if (!orderDoc) {
        res.send({
          result: false,
          inform: "Mã đơn hàng không tồn tại",
          order: null,
        });
        // console.log("not exist");
      } else {
        res.send({
          result: true,
          inform: "Mã đơn hàng hợp lệ",
          order: orderDoc,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCheckingAuth = (req, res, next) => {
  // console.log(JSON.stringify(req.body));
  const sessionId = req.body.sessionId;
  // console.log("postCheckingAuth");
  // console.log(sessionId);

  // store.get(sessionId, (error, session) => {
  //   console.log(session);
  // })
  //Get all session from DB
  if (sessionId !== "") {
    store.all((err, obj) => {
      //fill user in each session that has the same email with that's to be got from client
      if (obj.length > 0) {
        const sessionOfThisUser = obj.filter((s_obj) => {
          return s_obj._id === sessionId;
        });

        //destroy session that need to logout
        if (sessionOfThisUser.length > 0) {
          res.send({ isLoggedIn: sessionOfThisUser[0].session.isLoggedIn });
        } else {
          res.send({ isLoggedIn: false });
        }
      } else {
        res.send({ isLoggedIn: false });
      }

      if (err) {
        console.log(err);
      }
    });
  }
};

exports.postClientLogin = (req, res, next) => {
  // console.log(JSON.stringify(req.body));
  const email = req.body.email;
  const password = req.body.password;
  var sessionId = "";
  var isLoggedIn = false;
  var product_arr = [];

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.send(false);
      } else {
        const orderIds = user.orderHistory.map((item) => item.orderId);

        const sendUserToClient = {
          email: user.email,
          name: user.name,
          doB: user.doB,
          phoneNumber: user.phoneNumber,
          address: user.address,
          point: user.point,
          imageUrl: user.imageUrl,
          cart: user.cart.items,
          orderHistory: null,
          sessionId: sessionId,
          isLoggedIn: isLoggedIn,
        };

        bcrypt
          .compare(password, user.password)
          .then((doMatch) => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save((err) => {
                store.all((err, obj) => {
                  //fill user in each session that has the same email with that's to be got from client
                  if (obj.length > 0) {
                    const sessionOfThisUser = obj.filter((s_obj) => {
                      return (
                        s_obj.session.user.email === sendUserToClient.email
                      );
                    });

                    //Get latest session
                    if (sessionOfThisUser.length > 0) {
                      sessionId =
                        sessionOfThisUser[sessionOfThisUser.length - 1]._id;
                      isLoggedIn =
                        sessionOfThisUser[sessionOfThisUser.length - 1].session
                          .isLoggedIn;
                    } else {
                      sessionId = "";
                      isLoggedIn = false;
                    }

                    sendUserToClient.sessionId = sessionId;
                    sendUserToClient.isLoggedIn = isLoggedIn;

                    // console.log("orderIds  " + orderIds);
                    Order.find({ _id: orderIds })
                      .then((orders) => {
                        // console.log(JSON.stringify(orders));
                        sendUserToClient.orderHistory = orders;

                        res.send({
                          status: "success",
                          isLoggedIn: true,
                          user: sendUserToClient,
                        });
                      })
                      .catch((err) => console.log(err));
                  } else {
                    throw "obj is null";
                  }
                  if (err) {
                    console.log(err);
                  }
                });
              });
            } else {
              res.send({ status: "failed", isLoggedIn: false, user: null });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // return next(error);
    });
};

exports.postClientLogout = (req, res, next) => {
  const sessionId = req.body.sessionId;
  // console.log(sessionId);

  //Get all session from DB
  store.all((err, obj) => {
    //fill user in each session that has the same email with that's to be got from client
    if (obj.length > 0) {
      const sessionOfThisUser = obj.filter((s_obj) => {
        return s_obj._id === sessionId;
      });

      //destroy session that need to logout
      if (sessionOfThisUser) {
        console.log(sessionOfThisUser);
        store.destroy(sessionOfThisUser[0]._id, (err) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ isLogout: true });
          }
        });
      } else {
        res.send({ isLogout: false });
      }
    } else {
      res.send({ isLogout: true });
    }

    if (err) {
      console.log(err);
    }
  });
};

exports.postClientSignup = (req, res, next) => {
  // console.log(JSON.stringify(req.body));

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
      return res.send({ msg: "Đăng ký tài khoản thàng công" });
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

exports.postClientEditUserInfo = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const sessionId = req.body.sessionId;
  // const email = req.body.email;
  const name = req.body.name;
  const doB = req.body.doB;
  const phoneNumber = req.body.phoneNumber;
  const address = "〒" + req.body.postcode + " - " + req.body.address;

  store.get(sessionId, (error, session) => {
    // console.log(session);
    if (session !== null) {
      User.findOne({ email: session.user.email })
        .then((user) => {
          if (user !== null) {
            user.name = name;
            user.doB = doB;
            user.phoneNumber = phoneNumber;
            user.address = address;
            user
              .save()
              .then((result) => {
                const sendEdittedUserToClient = {
                  // email: user.email,
                  name: user.name,
                  doB: user.doB,
                  phoneNumber: user.phoneNumber,
                  address: user.address,
                  // point: user.point,
                  // imageUrl: user.imageUrl,
                  // cart: user.cart.items,
                  // sessionId: sessionId,
                  // isLoggedIn: isLoggedIn,
                };
                res.send({
                  inform: "Thay đổi thông tin thành công",
                  isEditted: true,
                  user: sendEdittedUserToClient,
                });
                // console.log(user);
              })
              .catch((err) => console.log(err));
          } else {
            res.send({
              inform: "Thay đổi thông tin thất bại",
              isEditted: false,
              user: null,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      res.send({
        inform: "Thay đổi thông tin thất bại",
        isEditted: false,
        user: null,
      });
    }
    if (error) {
      console.log(error);
    }
  });
};

exports.postClientChangeAccountPassword = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const sessionId = req.body.sessionId;
  // const email = req.body.email;
  const password = req.body.password;
  store.get(sessionId, (error, session) => {
    // console.log(session);
    if (session !== null) {
      User.findOne({ email: session.user.email })
        .then((user) => {
          if (user !== null) {
            bcrypt
              .hash(password, 12) //Ma hoa pw thanh ma hash, agr2 la so vong bam, gia tri cang cao cang ton tgian nhung  cang an toan, 12 la du
              .then((hashedPassword) => {
                user.password = hashedPassword;
                user
                  .save()
                  .then((result) => {
                    store.destroy(sessionId);

                    res.send({
                      inform:
                        "Thay đổi mật khẩu thành công \nVui lòng đăng nhập lại!",
                      isEditted: true,
                    });
                    // console.log(user);
                  })
                  .catch((err) => console.log(err));
              });
          } else {
            res.send({
              inform: "Thay đổi mật khẩu thất bại",
              isEditted: false,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      res.send({
        inform: "Thay đổi mật khẩu thất bại",
        isEditted: false,
      });
    }
    if (error) {
      console.log(error);
    }
  });
};

exports.postClientConfirmBeforeResetPassword = (req, res, next) => {
  console.log(JSON.stringify(req.body.email));
  const email = req.body.email;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    } else {
      const token = buffer.toString("hex");
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            res.send({ inform: "Địa chỉ email không tồn tại" });
          } else {
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 1000 * 60; //360000 milisecond = 1hour
            return user.save();
          }
        })
        .then((result) => {
          res.send({ inform: "Kiểm tra email xác nhận thay đổi mật khẩu" });
          // res.redirect("/login");
          // console.log(req.body.email);
          // return transporter.sendMail({
          //   to: req.body.email,
          //   from: "tudmfx12838@funix.edu.vn",
          //   subject: "Reset password succeeded!",
          //   html: `<h1>Reset password successfully!</h1>
          //        <p><a href="http://localhost:3000/reset/${token}">Click here to return!</a></p>
          //       `,
          // });
        })
        .catch((err) => {
          // const error = new Error(err);
          // error.httpStatusCode = 500;
          // return next(error);
        });
    }
  });
};

exports.postChangeAccountPasswordWithToken = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const token = req.body.token;
  const newPassword = req.body.password;

  // , resetTokenExpiration: { $gt: new Date() }
  User.findOne({ resetToken: token })
    .then((resetUser) => {
      // console.log(resetUser);
      // console.log(Date.parse(resetUser.resetTokenExpiration));
      if (!resetUser) {
        res.send({
          inform:
            "Token không hợp lệ\nVui lòng thực hiện lại thao tác quên mật khẩu",
          isEditted: false,
        });
      } else {
        const resetTokenExpiration = Date.parse(resetUser.resetTokenExpiration);
        const timeNow = Date.now();
        // console.log(resetTokenExpiration + " , " + timeNow);

        if (timeNow < resetTokenExpiration) {
          // console.log("lt");
          bcrypt.hash(newPassword, 12).then((hashedPassword) => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            resetUser
              .save()
              .then((result) => {
                res.send({
                  inform: "Thay đổi mật khẩu thành công",
                  isEditted: true,
                });
              })
              .catch((err) => console.log(err));
          });
        } else {
          resetUser.resetToken = undefined;
          resetUser.resetTokenExpiration = undefined;
          resetUser
            .save()
            .then((result) => {
              res.send({
                inform: "Thời gian thay đổi mật khẩu hết hạn",
                isEditted: false,
              });
            })
            .catch((err) => console.log(err));
        }
      }
    })
    .catch((err) => {
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

exports.postUpdateCartFromClientToServer = (req, res, next) => {
  // console.log("postUpdateCartFromClientToServer \n" + JSON.stringify(req.body));

  const Carts = req.body.Carts;
  const sessionId = req.body.sessionId;

  // console.log(Carts);
  // console.log(shortCarts);

  store.get(sessionId, (error, session) => {
    console.log(session);
    if (session !== null) {
      User.findOne({ _id: session.user._id })
        .then((user) => {
          if (user !== null) {
            user.cart.items = Carts;
            user
              .save()
              .then((result) => {
                console.log("updated cart completely " + sessionId);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
    if (error) {
      console.log(error);
    }
  });
  //Kiem tra session con ton tai khong, neu khong yeu cau dang nhap lai
  //kiem tra email trong user co ton tai khong neu co thi add cart neu khong thi tra ve yeu cau dang nhap lai
  //ok thi tien hanh tach lai productId va quantity de add vao user's cart, tra ve ok

  // res.cookie('XSRF-TOKEN', req.csrfToken());
  // app.all('*', function (req, res) {
  //   res.cookie('XSRF-TOKEN', req.csrfToken())
  //   res.render('index')
  // })
};
