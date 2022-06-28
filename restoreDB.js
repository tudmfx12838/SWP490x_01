var MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
var url =
  "mongodb+srv://admin:8888@cluster0.pi4yq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var userObj = [
  {
    email: "admin1@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "admin",
    name: "Nguyen Van A",
    doB: new Date("1995-03-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 100,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "admin2@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "admin",
    name: "Nguyen Van B",
    doB: new Date("1997-02-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 200,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user1@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Tran Thi C",
    doB: new Date("1990-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user2@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Tran Van D",
    doB: new Date("1990-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user3@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Tran Van P",
    doB: new Date("1992-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user4@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Cao Van E",
    doB: new Date("1997-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user5@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Duong Van F",
    doB: new Date("1990-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user6@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Tran Van G",
    doB: new Date("1999-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user7@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Tran Van H",
    doB: new Date("1990-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user8@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Tran Van R",
    doB: new Date("1993-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user9@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Nguyen Thi H",
    doB: new Date("1990-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user10@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Nguyen Van L",
    doB: new Date("1991-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user11@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Duong Van H",
    doB: new Date("1990-06-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user12@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Cao Van K",
    doB: new Date("1990-05-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "user13@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Tran Thi H",
    doB: new Date("1990-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
  {
    email: "pocket.se7en@gmail.com",
    password: "$2a$12$HD2M/cr0Rt/F9968Njm1tu35qICy47HX0f61cqpGAkw5UcMgrOsRS",
    permission: "user",
    name: "Dang Minh Tu",
    doB: new Date("1990-04-03T00:00:00.000+00:00"),
    phoneNumber: "0901234567",
    address: "〒7330822-HiroshimaShi",
    imageUrl: "images/avatar.jpg",
    point: 50,
    cart: { items: [] },
    orderHistory: [
      {
        orderId: mongoose.Types.ObjectId("62b08b7df58ff042f6f4ea60"),
      },
      {
        orderId: mongoose.Types.ObjectId("62b08f330edf7cc75ca58917"),
      },
      {
        orderId: mongoose.Types.ObjectId("62b08fb3692cf1a36d6e0de3"),
      },
    ],
    available: true,
    resetToken: null,
    resetTokenExpiration: null,
  },
];

var productObj = [
  {
    title: "Nước Mắm",
    price: 570,
    type: "thucphamkho",
    description: "Nước mắm Namm Ngư nhập khẩu Việt Nam",
    imageUrl: "images/nuocmam.jpg",
    mount: 10,
    available: true,
  },
  {
    title: "Nước Tương",
    price: 400,
    type: "thucphamkho",
    description: "Nước Tương Chinsu nhập khẩu Việt Nam",
    imageUrl: "images/nuoctuongchinsu.jpg",
    mount: 5,
    available: true,
  },
  {
    title: "Tương ớt",
    price: 200,
    type: "thucphamkho",
    description: "Tương ớt Chinsu nhập khẩu Việt Nam",
    imageUrl: "images/tuongotchinsu.jpg",
    mount: 5,
    available: true,
  },
  {
    title: "Mắm tôm",
    price: 350,
    type: "thucphamkho",
    description: "Mắm tôm nhập khẩu Việt Nam",
    imageUrl: "images/mamtom.jpg",
    mount: 5,
    available: true,
  },
  {
    title: "Mắm ruốc",
    price: 350,
    type: "thucphamkho",
    description: "Mắm ruốc nhập khẩu Việt Nam",
    imageUrl: "images/mamruoc.jpg",
    mount: 5,
    available: true,
  },
  {
    title: "Tiêu đen",
    price: 950,
    type: "thucphamkho",
    description: "Tiêu đen nhập khẩu Việt Nam",
    imageUrl: "images/tieuden.jpg",
    mount: 2,
    available: true,
  },
  {
    title: "Bánh tráng",
    price: 400,
    type: "thucphamkho",
    description: "Bánh tráng nhập khẩu Việt Nam",
    imageUrl: "images/banhtrang.jpg",
    mount: 3,
    available: true,
  },
  {
    title: "Hạt nêm",
    price: 600,
    type: "thucphamkho",
    description: "Hạt nêm Knorr nhập khẩu Việt Nam",
    imageUrl: "images/hatnemknorr.jpg",
    mount: 7,
    available: true,
  },
  {
    title: "Muối Hảo Hảo",
    price: 650,
    type: "thucphamkho",
    description: "Muối Hảo Hảo nhập khẩu Việt Nam",
    imageUrl: "images/muoihaohao.jpg",
    mount: 8,
    available: true,
  },
  {
    title: "Mì Hảo Hảo",
    price: 99,
    type: "thucphamkho",
    description: "Mì Hảo Hảo nhập khẩu Việt Nam",
    imageUrl: "images/mihaohao.jpg",
    mount: 20,
    available: true,
  },
  {
    title: "Mì Omachi",
    price: 120,
    type: "thucphamkho",
    description: "Mì Omachi nhập khẩu Việt Nam",
    imageUrl: "images/miomachi.jpg",
    mount: 20,
    available: true,
  },
  {
    title: "Phở Vifon",
    price: 150,
    type: "thucphamkho",
    description: "Phở Vifon nhập khẩu Việt Nam",
    imageUrl: "images/phovifon.jpg",
    mount: 30,
    available: true,
  },
  {
    title: "Sa tế tôm",
    price: 250,
    type: "thucphamkho",
    description: "Sa tế tôm nhập khẩu Việt Nam",
    imageUrl: "images/satetom.jpg",
    mount: 10,
    available: true,
  },
  {
    title: "Bánh phồng",
    price: 450,
    type: "thucphamkho",
    description: "Bánh phồng tôm nhập khẩu Việt Nam",
    imageUrl: "images/banhphongtom.jpg",
    mount: 20,
    available: true,
  },
  {
    title: "Bún khô",
    price: 270,
    type: "thucphamkho",
    description: "Bún khô tôm nhập khẩu Việt Nam",
    imageUrl: "images/bunkho.jpg",
    mount: 5,
    available: true,
  },
  {
    title: "Gà ta",
    price: 650,
    type: "thucphamtuoi",
    description: "Gà ta đông lạnh",
    imageUrl: "images/gata.jpg",
    mount: 20,
    available: true,
  },
  {
    title: "Lòng heo non",
    price: 900,
    type: "thucphamtuoi",
    description: "Lòng heo non đông lạnh",
    imageUrl: "images/longnon.jpg",
    mount: 20,
    available: true,
  },
  {
    title: "Thịt bò",
    price: 1200,
    type: "thucphamtuoi",
    description: "Thịt bò non đông lạnh",
    imageUrl: "images/thitbo.jpg",
    mount: 10,
    available: true,
  },
  {
    title: "Thịt heo",
    price: 1000,
    type: "thucphamtuoi",
    description: "Thịt heo non đông lạnh",
    imageUrl: "images/thitheo.jpg",
    mount: 15,
    available: true,
  },
  {
    title: "Gà ta",
    price: 650,
    type: "thucphamtuoi",
    description: "Gà ta đông lạnh",
    imageUrl: "images/gata.jpg",
    mount: 20,
    available: true,
  },
  {
    title: "Lòng heo",
    price: 900,
    type: "thucphamtuoi",
    description: "Lòng heo non đông lạnh",
    imageUrl: "images/longnon.jpg",
    mount: 20,
    available: true,
  },
  {
    title: "Thịt bò",
    price: 1200,
    type: "thucphamtuoi",
    description: "Thịt bò non đông lạnh",
    imageUrl: "images/thitbo.jpg",
    mount: 10,
    available: true,
  },
  {
    title: "Thịt heo",
    price: 1000,
    type: "thucphamtuoi",
    description: "Thịt heo non đông lạnh",
    imageUrl: "images/thitheo.jpg",
    mount: 15,
    available: true,
  },
  {
    title: "Bia 333",
    price: 180,
    type: "thucuong",
    description: "Bia 333 nhập khẩu Việt Nam",
    imageUrl: "images/bia333.jpg",
    mount: 150,
    available: true,
  },
  {
    title: "Nước Sting",
    price: 130,
    type: "thucuong",
    description: "Nước ngọt Sting nhập khẩu Việt Nam",
    imageUrl: "images/sting.jpg",
    mount: 150,
    available: true,
  },
  {
    title: "Nước Bò Húc",
    price: 190,
    type: "thucuong",
    description: "Nước ngọt Bò Húc nhập khẩu Việt Nam",
    imageUrl: "images/bohuc.jpg",
    mount: 100,
    available: true,
  },
  {
    title: "Bia Tiger",
    price: 290,
    type: "thucuong",
    description: "Bia Tiger nhập khẩu Việt Nam",
    imageUrl: "images/biatiger.jpg",
    mount: 100,
    available: true,
  },
  {
    title: "Xả cây",
    price: 650,
    type: "thucphamtuoi",
    description: "Xả cây tươi",
    imageUrl: "images/xacay.jpg",
    mount: 15,
    available: true,
  },
  {
    title: "Rau răm",
    price: 400,
    type: "thucphamtuoi",
    description: "Rau răm tươi",
    imageUrl: "images/rauram.jpg",
    mount: 15,
    available: true,
  },
  {
    title: "Nước Sting",
    price: 130,
    type: "thucuong",
    description: "Nước ngọt Sting nhập khẩu Việt Nam",
    imageUrl: "images/sting.jpg",
    mount: 150,
    available: true,
  },
  {
    title: "Nước Bò Húc",
    price: 190,
    type: "thucuong",
    description: "Nước ngọt Bò Húc nhập khẩu Việt Nam",
    imageUrl: "images/bohuc.jpg",
    mount: 100,
    available: true,
  },
  {
    title: "Bia Tiger",
    price: 290,
    type: "thucuong",
    description: "Bia Tiger nhập khẩu Việt Nam",
    imageUrl: "images/biatiger.jpg",
    mount: 100,
    available: true,
  },
];

var eventObj = [
  {
    title: "Mừng Xuân 2020",
    startDate: new Date("2019-12-20T00:00:00.000+00:00"),
    endDate: new Date("2020-01-10T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.1,
    description:
      "Mừng Xuân 2020 giảm 10% khi mua hàng online(20/12/2019 ~ 10/01/2020)",
    imageUrl: "images/sukienxuan2020.jpg",
  },
  {
    title: "Mừng ngày Phụ  Nữ 8/3/2020",
    startDate: new Date("2020-03-08T00:00:00.000+00:00"),
    endDate: new Date("2020-03-10T00:00:00.000+00:00"),
    hasCoupon: true,
    coupon: "PHUNU0803",
    discount: 0.15,
    description:
      "Mừng ngày Phụ  Nữ 8/3, nhập mã PHUNU0803 để giảm 15% khi mua hàng online trên 10000 yên(08/03/2020 ~ 10/03/2020)",
    imageUrl: "images/phunu08032020.jpg",
  },
  {
    title: "Mừng ngày 30/4/2020",
    startDate: new Date("2020-04-30T00:00:00.000+00:00"),
    endDate: new Date("2020-05-01T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.1,
    description:
      "Mừng ngày 30/4/2020 giảm 10% khi mua hàng online(30/04/2020 ~ 01/05/2020)",
    imageUrl: "images/mung30042020.jpg",
  },
  {
    title: "Mừng ngày Nhà Giáo Việt Nam 20/11/2020",
    startDate: new Date("2020-11-19T00:00:00.000+00:00"),
    endDate: new Date("2020-11-22T00:00:00.000+00:00"),
    hasCoupon: true,
    coupon: "NHAGIAO2011",
    discount: 0.1,
    description:
      "Mừng ngày Nhà Giáo Việt Nam 20/11/2020, nhập mã NHAGIAO2011 để giảm 10% khi mua hàng online(19/11/2020 ~ 22/11/2020)",
    imageUrl: "images/nhagiao20112020.jpg",
  },
  {
    title: "Giảm giá cuối năm",
    startDate: new Date("2020-12-01T00:00:00.000+00:00"),
    endDate: new Date("2020-12-19T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.2,
    description:
      "Giảm giá cuối năm 20% trên tổng hóa đơn khi mua hàng online(01/12/2020 ~ 19/12/2020)",
    imageUrl: "images/giamgiacuoinam2020.jpg",
  },
  {
    title: "Mừng Xuân 2021",
    startDate: new Date("2020-12-20T00:00:00.000+00:00"),
    endDate: new Date("2021-01-10T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.1,
    description:
      "Mừng Xuân 2021 giảm 10% khi mua hàng online(20/12/2020 ~ 10/01/2021)",
    imageUrl: "images/sukienxuan2020.jpg",
  },
  {
    title: "Mừng ngày Phụ  Nữ 8/3/2021",
    startDate: new Date("2021-03-08T00:00:00.000+00:00"),
    endDate: new Date("2021-03-10T00:00:00.000+00:00"),
    hasCoupon: true,
    coupon: "PHUNU0803",
    discount: 0.15,
    description:
      "Mừng ngày Phụ  Nữ 8/3, nhập mã PHUNU0803 để giảm 15% khi mua hàng online trên 10000 yên(08/03/2021 ~ 10/03/2021)",
    imageUrl: "images/phunu08032021.jpg",
  },
  {
    title: "Mừng ngày 30/4/2021",
    startDate: new Date("2021-04-30T00:00:00.000+00:00"),
    endDate: new Date("2021-05-01T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.1,
    description:
      "Mừng ngày 30/4/2021 giảm 10% khi mua hàng online(30/04/2021 ~ 01/05/2021)",
    imageUrl: "images/mung30042021.jpg",
  },
  {
    title: "Mừng ngày Nhà Giáo Việt Nam 20/11/2021",
    startDate: new Date("2021-11-19T00:00:00.000+00:00"),
    endDate: new Date("2021-11-22T00:00:00.000+00:00"),
    hasCoupon: true,
    coupon: "NHAGIAO2011",
    discount: 0.1,
    description:
      "Mừng ngày Nhà Giáo Việt Nam 20/11/2021, nhập mã NHAGIAO2011 để giảm 10% khi mua hàng online(19/11/2021 ~ 22/11/2021)",
    imageUrl: "images/nhagiao20112021.jpg",
  },
  {
    title: "Giảm giá cuối năm",
    startDate: new Date("2021-12-01T00:00:00.000+00:00"),
    endDate: new Date("2021-12-19T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.2,
    description:
      "Giảm giá cuối năm 20% trên tổng hóa đơn khi mua hàng online(01/12/2021 ~ 19/12/2021)",
    imageUrl: "images/giamgiacuoinam2021.jpg",
  },
  {
    title: "Mừng Xuân 2022",
    startDate: new Date("2021-12-20T00:00:00.000+00:00"),
    endDate: new Date("2022-01-10T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.1,
    description:
      "Mừng Xuân 2022 giảm 10% khi mua hàng online(20/12/2021 ~ 10/01/2022)",
    imageUrl: "images/sukienxuan2020.jpg",
  },
  {
    title: "Mừng ngày Phụ  Nữ 8/3/2022",
    startDate: new Date("2022-03-08T00:00:00.000+00:00"),
    endDate: new Date("2022-03-10T00:00:00.000+00:00"),
    hasCoupon: true,
    coupon: "PHUNU0803",
    discount: 0.15,
    description:
      "Mừng ngày Phụ  Nữ 8/3, nhập mã PHUNU0803 để giảm 15% khi mua hàng online trên 10000 yên(08/03/2022 ~ 10/03/2022)",
    imageUrl: "images/phunu08032022.jpg",
  },
  {
    title: "Mừng ngày 30/4/2022",
    startDate: new Date("2022-04-30T00:00:00.000+00:00"),
    endDate: new Date("2022-05-01T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.1,
    description:
      "Mừng ngày 30/4/2022 giảm 10% khi mua hàng online(30/04/2022 ~ 01/05/2022)",
    imageUrl: "images/mung30042022.jpg",
  },
  {
    title: "Mừng ngày Nhà Giáo Việt Nam 20/11/2022",
    startDate: new Date("2022-11-19T00:00:00.000+00:00"),
    endDate: new Date("2022-11-22T00:00:00.000+00:00"),
    hasCoupon: true,
    coupon: "NHAGIAO2011",
    discount: 0.1,
    description:
      "Mừng ngày Nhà Giáo Việt Nam 20/11/2022, nhập mã NHAGIAO2011 để giảm 10% khi mua hàng online(19/11/2022 ~ 22/11/2022)",
    imageUrl: "images/nhagiao20112022.jpg",
  },
  {
    title: "Giảm giá cuối năm",
    startDate: new Date("2022-12-01T00:00:00.000+00:00"),
    endDate: new Date("2022-12-19T00:00:00.000+00:00"),
    hasCoupon: false,
    coupon: "",
    discount: 0.2,
    description:
      "Giảm giá cuối năm 20% trên tổng hóa đơn khi mua hàng online(01/12/2022 ~ 19/12/2022)",
    imageUrl: "images/giamgiacuoinam2022.jpg",
  },
  {
    title: "Khách hàng mới",
    startDate: new Date("2021-01-01T00:00:00.000+00:00"),
    endDate: new Date("2022-12-30T00:00:00.000+00:00"),
    hasCoupon: true,
    coupon: "NEWMEMBER",
    discount: 0.2,
    description:
      "Giảm giá 20% trên tổng hóa đơn khi đăng ký mua hàng lần đầu(01/01/2021 ~ 30/12/2022)",
    imageUrl: "images/khachhangmoi20212022.jpg",
  },
];

const orderObj = [
  {
    products: [
      {
        productId: {
          $oid: "629048d034434f7448b169ca",
        },
        title: "Tương ớt",
        quantity: 3,
        price: 200,
        _id: {
          $oid: "62922bd4c9425920267df7af",
        },
      },
    ],
    cashInfo: {
      totalCash: 600,
      coupon: { name: "", discount: 0 },
      afterDiscount: 600,
      isPaid: false,
    },
    date: {
      $date: "2022-05-28T14:04:04.919Z",
    },
    approveStatus: false,
    hasAccountInfo: {
      userId: null,
    },
    deliveryInfo: {
      name: "admin",
      email: "admin2@gmail.com",
      phoneNumber: "1234567890",
      address: "〒7330822-広島県 広島市西区 庚午中  a123",
      node: "",
    },
  },
  {
    products: [
      {
        productId: {
          $oid: "629048d034434f7448b169ca",
        },
        title: "Tương ớt",
        quantity: 3,
        price: 200,
        _id: {
          $oid: "62922be7c9425920267df7b2",
        },
      },
    ],
    cashInfo: {
      totalCash: 600,
      coupon: { name: "", discount: 0 },
      afterDiscount: 600,
      isPaid: false,
    },
    date: {
      $date: "2022-05-28T14:04:23.929Z",
    },
    approveStatus: false,
    hasAccountInfo: {
      userId: null,
    },
    deliveryInfo: {
      name: "admin",
      email: "admin2@gmail.com",
      phoneNumber: "1234567890",
      address: "〒7330822-広島県 広島市西区 庚午中  a123",
      node: "",
    },
  },
  {
    products: [
      {
        productId: {
          $oid: "629048d034434f7448b169ca",
        },
        title: "Tương ớt",
        quantity: 3,
        price: 200,
        _id: {
          $oid: "62922bebc9425920267df7b5",
        },
      },
    ],
    cashInfo: {
      totalCash: 600,
      coupon: { name: "", discount: 0 },
      afterDiscount: 600,
      isPaid: false,
    },
    date: {
      $date: "2022-05-28T14:04:27.014Z",
    },
    approveStatus: false,
    hasAccountInfo: {
      userId: null,
    },
    deliveryInfo: {
      name: "admin",
      email: "admin2@gmail.com",
      phoneNumber: "1234567890",
      address: "〒7330822-広島県 広島市西区 庚午中  a123",
      node: "",
    },
  },
  {
    products: [
      {
        productId: {
          $oid: "629048d034434f7448b169ca",
        },
        title: "Tương ớt",
        quantity: 3,
        price: 200,
        _id: {
          $oid: "62922c09c9425920267df7b8",
        },
      },
      {
        productId: {
          $oid: "629048d034434f7448b169e0",
        },
        title: "Nước Sting",
        quantity: 2,
        price: 130,
        _id: {
          $oid: "62922c09c9425920267df7b9",
        },
      },
      {
        productId: {
          $oid: "629048d034434f7448b169e1",
        },
        title: "Nước Bò Húc",
        quantity: 2,
        price: 190,
        _id: {
          $oid: "62922c09c9425920267df7ba",
        },
      },
      {
        productId: {
          $oid: "629048d034434f7448b169e2",
        },
        title: "Bia Tiger",
        quantity: 5,
        price: 290,
        _id: {
          $oid: "62922c09c9425920267df7bb",
        },
      },
    ],
    cashInfo: {
      totalCash: 2690,
      coupon: { name: "", discount: 0 },
      afterDiscount: 2690,
      isPaid: false,
    },
    date: {
      $date: "2022-05-28T14:04:57.493Z",
    },
    approveStatus: false,
    hasAccountInfo: {
      userId: null,
    },
    deliveryInfo: {
      name: "tu",
      email: "pocket.se7en@gmail.com",
      phoneNumber: "0907764868",
      address: "〒7330821-広島県 広島市西区 庚午北  a123",
      node: "",
    },
  },
  {
    products: [
      {
        productId: {
          $oid: "629048d034434f7448b169e0",
        },
        title: "Nước Sting",
        quantity: 2,
        price: 130,
        _id: {
          $oid: "62922c5ec9425920267df7be",
        },
      },
      {
        productId: {
          $oid: "629048d034434f7448b169e2",
        },
        title: "Bia Tiger",
        quantity: 5,
        price: 290,
        _id: {
          $oid: "62922c5ec9425920267df7bf",
        },
      },
    ],
    cashInfo: {
      totalCash: 1710,
      coupon: { name: "", discount: 0 },
      afterDiscount: 1710,
      isPaid: false,
    },
    date: {
      $date: "2022-05-28T14:06:22.269Z",
    },
    approveStatus: false,
    hasAccountInfo: {
      userId: null,
    },
    deliveryInfo: {
      name: "tien",
      email: "mrhi.dangminhtu@gmail.com",
      phoneNumber: "0907764868",
      address: "〒7330822-広島県 広島市西区 庚午中  a123",
      node: "",
    },
  },
  {
    products: [
      {
        productId: {
          $oid: "629048d034434f7448b169db",
        },
        title: "Gà ta",
        quantity: 1,
        price: 650,
        _id: {
          $oid: "62922cf2c9425920267df7c4",
        },
      },
      {
        productId: {
          $oid: "629048d034434f7448b169da",
        },
        title: "Thịt heo",
        quantity: 1,
        price: 1000,
        _id: {
          $oid: "62922cf2c9425920267df7c5",
        },
      },
      {
        productId: {
          $oid: "629048d034434f7448b169d9",
        },
        title: "Thịt bò",
        quantity: 1,
        price: 1200,
        _id: {
          $oid: "62922cf2c9425920267df7c6",
        },
      },
    ],
    cashInfo: {
      totalCash: 2850,
      coupon: { name: "", discount: 0 },
      afterDiscount: 2850,
      isPaid: false,
    },
    date: {
      $date: "2022-05-28T14:08:50.324Z",
    },
    approveStatus: false,
    hasAccountInfo: {
      userId: null,
    },
    deliveryInfo: {
      name: "phuong",
      email: "hhp010799@gmail.com",
      phoneNumber: "0907787897",
      address: "〒7330311-広島県 広島市西区 庚午中  a123",
      node: "",
    },
  },
  {
    _id: mongoose.Types.ObjectId("62b08b7df58ff042f6f4ea60"),

    products: [
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdbc"),
        title: "Tương ớt",
        quantity: 2,
        price: 200,
         imageUrl: "images/nuocmam.jpg",
      },
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdba"),
        title: "Nước Mắm",
        quantity: 2,
        price: 570,
        imageUrl: "images/nuocmam.jpg",
      },
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdcb"),
        title: "Thịt bò",
        quantity: 2,
        price: 1200,
        imageUrl: "images/nuocmam.jpg",
      },
    ],
    cashInfo: {
      totalCash: 3940,
      coupon: { name: "", discount: 0 },
      afterDiscount: 3940,
      isPaid: false,
    },
    date: "2022-06-20T15:18:11.180Z",
    approveStatus: false,
    hasAccountInfo: {
      userId: mongoose.Types.ObjectId("62b32fb35d7bfb759e64d9ec"),
    },
    deliveryInfo: {
      name: "Dang Minh Tu",
      email: "pocket.se7en@gmail.com",
      phoneNumber: "0901234567",
      address: "〒7330822-HiroshimaShi HiroshimaShi",
      node: "",
    },
    __v: 0,
  },
  {
    _id: mongoose.Types.ObjectId("62b08f330edf7cc75ca58917"),

    products: [
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdd1"),
        title: "Bia 333",
        quantity: 1,
        price: 180,
        imageUrl: "images/nuocmam.jpg",
      },
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdd2"),
        title: "Nước Sting",
        quantity: 1,
        price: 130,
        imageUrl: "images/nuocmam.jpg",
      },
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdd3"),
        title: "Nước Bò Húc",
        quantity: 1,
        price: 190,
        imageUrl: "images/nuocmam.jpg",
      },
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdd4"),
        title: "Bia Tiger",
        quantity: 1,
        price: 290,
        imageUrl: "images/nuocmam.jpg",
      },
    ],
    cashInfo: {
      totalCash: 790,
      coupon: { name: "", discount: 0 },
      afterDiscount: 790,
      isPaid: false,
    },
    date: "2022-06-20T15:18:11.180Z",
    approveStatus: false,
    hasAccountInfo: {
      userId: mongoose.Types.ObjectId("62b32fb35d7bfb759e64d9ec"),
    },
    deliveryInfo: {
      name: "Dang Minh Tu",
      email: "pocket.se7en@gmail.com",
      phoneNumber: "0901234567",
      address: "〒7330822-HiroshimaShi HiroshimaShi",
      node: "",
    },
    __v: 0,
  },
  {
    _id: mongoose.Types.ObjectId("62b08fb3692cf1a36d6e0de3"),
    products: [
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdbc"),
        title: "Tương ớt",
        quantity: 2,
        price: 200,
        imageUrl: "images/nuocmam.jpg",
      },
      {
        productId: mongoose.Types.ObjectId("62af10adf651994f261ffdba"),
        title: "Nước Mắm",
        quantity: 2,
        price: 570,
        imageUrl: "images/nuocmam.jpg",
      },
    ],
    cashInfo: {
      totalCash: 1540,
      coupon: { name: "", discount: 0 },
      afterDiscount: 1540,
      isPaid: false,
    },
    date: "2022-06-20T15:18:11.180Z",
    approveStatus: false,
    hasAccountInfo: {
      userId: mongoose.Types.ObjectId("62b32fb35d7bfb759e64d9ec"),
    },
    deliveryInfo: {
      name: "Dang Minh Tu",
      email: "pocket.se7en@gmail.com",
      phoneNumber: "0901234567",
      address: "〒7330822-HiroshimaShi HiroshimaShi",
      node: "",
    },
    __v: 0,
  },
];

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("myShopDB");

  //Drop DB
  dbo.dropDatabase();
  //Create a collection name "customers":
  dbo.createCollection("users", function (err, res) {
    if (err) throw err;
    console.log("users's collection created!");
  });
  dbo.createCollection("products", function (err, res) {
    if (err) throw err;
    console.log("products's collection created!");
  });
  dbo.createCollection("events", function (err, res) {
    if (err) throw err;
    console.log("events's collection created!");
  });
  dbo.createCollection("orders", function (err, res) {
    if (err) throw err;
    console.log("oders's Collection created!");
  });

  dbo.collection("users").insertMany(userObj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
  dbo.collection("products").insertMany(productObj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
  dbo.collection("events").insertMany(eventObj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
  dbo.collection("orders").insertMany(orderObj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
  console.log("Resotre DB completely!!!");
  //   db.close();
});
