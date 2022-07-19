const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const csrf = require("csurf");
const session = require("express-session");
const MongoDbStote = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");

const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");

const User = require("./models/user");

const MONGODB_URL =
  "mongodb+srv://admin:8888@cluster0.pi4yq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const store = new MongoDbStote({
  uri: MONGODB_URL,
  collection: "sessions",
  databaseName: "myShopDB",
  // expires: 1000 * 60 * 60, // 60 seconds in milliseconds
  // expires  them vao de tu xoa sau het phien
});

const csrfProtection = csrf({ cookie: true });
// {
// cookie: {
//      httpOnly: true,
//      secure: process.env.NODE_ENV === 'production',
//      maxAge: 3600 // 1-hour
//  }
// }

/**
 * The method fileStorage() setup a image's storage
 * */
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // const date = new Date().now();
    // console.log(new Date().toISOString());
    cb(null, file.originalname);
    // cb(null, (new Date().toISOString()) + '-' + file.originalname); //(new Date().toISOString())
  },
});

/**
 * The method fileFilter() checking valid image's file type
 * */
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
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

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,PATCH, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

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
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
); //image a name of image file at view edit-produt.ejs, {dest: 'images'} them folder luu tru

/**
 * Config static pat
 * */
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

/**
 * Config session
 * */
app.use(
  session({
    secret: "my secret", //secret dc su dung de dang ky ma bam bi mat ID trong cookie
    resave: false, //session se khong duoc luu doi voi moi req dc thuc hien
    saveUninitialized: false, //dam bao khong co session nao duoc luu cho 1 req khi khong can thiet
    store: store, //Thiet lap store de luu truu session tren mongodb
  })
);

// app.use(cookieParser());

/**
 * Config csrf
 * */
// app.use(csrfProtection);
// app.use(csrf({
//   cookie: {
//        httpOnly: true,
//        secure: process.env.NODE_ENV === 'production',
//        maxAge: 3600 // 1-hour
//    }
// }));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn; //tinh nang dac biet res.locals. cua expessjs dung de thiet lap cac bien cuc bo truyen vao cac view
  res.locals.csrfToken = ""; //req.csrfToken();
  // res.locals.csrfToken = req.csrfToken();

  if (req.session.user) {
    res.locals.permission = req.session.user.permission;
    // console.log(req.user.permission);
  }

  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

/**
 * Config router
 * */
app.use(adminRoutes);
app.use(clientRoutes);
app.use(authRoutes);

// app.get('/500', errorController.get500);
app.use(errorController.getPageError);

// app.use((error, req, res, next) => {
//   // console.log('Hello');
//   // res.redirect('/500');
//   res.status(500).render('errors/500', {
//     pageTitle: "Error!",
//     path: '/500',
//     isAuthenticated: req.session.isLoggedIn
//   });
// });

/**
 * Config port and connect to database
 * */
mongoose
  .connect(MONGODB_URL, { dbName: "myShopDB" })
  .then((result) => {
    // app.listen(4000);
    // console.log("App listening on port 4000");
    app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
      console.log('Server is running');
    })
  })
  .catch((err) => {
    console.log(err);
  });
