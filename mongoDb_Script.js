var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:8888@cluster0.pi4yq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var userObj = [
    {
        email: "admin1@gmail.com",
        password: "123456",
        permission: "admin",
        name: "Nguyen Van A",
        doB: new Date("1995-03-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 100,
        cart:{items: []}
    },
    {
        email: "admin2@gmail.com",
        password: "123456",
        permission: "admin",
        name: "Nguyen Van B",
        doB: new Date("1997-02-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 200,
        cart:{items: []}
    },
    {
        email: "user1@gmail.com",
        password: "123456",
        permission: "user",
        name: "Tran Thi C",
        doB: new Date("1990-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user2@gmail.com",
        password: "123456",
        permission: "user",
        name: "Tran Van D",
        doB: new Date("1990-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user3@gmail.com",
        password: "123456",
        permission: "user",
        name: "Tran Van P",
        doB: new Date("1992-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user4@gmail.com",
        password: "123456",
        permission: "user",
        name: "Cao Van E",
        doB: new Date("1997-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user5@gmail.com",
        password: "123456",
        permission: "user",
        name: "Duong Van F",
        doB: new Date("1990-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user6@gmail.com",
        password: "123456",
        permission: "user",
        name: "Tran Van G",
        doB: new Date("1999-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user7@gmail.com",
        password: "123456",
        permission: "user",
        name: "Tran Van H",
        doB: new Date("1990-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user8@gmail.com",
        password: "123456",
        permission: "user",
        name: "Tran Van R",
        doB: new Date("1993-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user9@gmail.com",
        password: "123456",
        permission: "user",
        name: "Nguyen Thi H",
        doB: new Date("1990-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user10@gmail.com",
        password: "123456",
        permission: "user",
        name: "Nguyen Van L",
        doB: new Date("1991-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user11@gmail.com",
        password: "123456",
        permission: "user",
        name: "Duong Van H",
        doB: new Date("1990-06-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user12@gmail.com",
        password: "123456",
        permission: "user",
        name: "Cao Van K",
        doB: new Date("1990-05-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    },
    {
        email: "user13@gmail.com",
        password: "123456",
        permission: "user",
        name: "Tran Thi H",
        doB: new Date("1990-04-03T00:00:00.000+00:00"),
        imageUrl: "images\\avatar.jpg",
        point: 50,
        cart:{items: []}
    }
];

var productObj = [
{
	title: "Nước Mắm Nam Ngư 750ml",
	price: 570,
	description: "Nước mắm Namm Ngư nhập khẩu Việt Nam",
	imageUrl: "images\\nuocman.jpg",
	mount: 10
},
{
	title: "Nước Tương Chinsu 250ml",
	price: 400,
	description: "Nước Tương Chinsu nhập khẩu Việt Nam",
	imageUrl: "images\\nuoctuongchinsu.jpg",
	mount: 5
},
{
	title: "Tương ớt Chinsu 250g",
	price: 200,
	description: "Tương ớt Chinsu nhập khẩu Việt Nam",
	imageUrl: "images\\tuongotchinsu.jpg",
	mount: 5
},
{
	title: "Mắm tôm",
	price: 350,
	description: "Mắm tôm nhập khẩu Việt Nam",
	imageUrl: "images\\mamtom.jpg",
	mount: 5
},
{
	title: "Mắm ruốc",
	price: 350,
	description: "Mắm ruốc nhập khẩu Việt Nam",
	imageUrl: "images\\mamruoc.jpg",
	mount: 5
},
{
	title: "Tiêu đen 500g",
	price: 950,
	description: "Tiêu đen nhập khẩu Việt Nam",
	imageUrl: "images\\tieuden.jpg",
	mount: 2
},
{
	title: "Bánh tráng 400g",
	price: 400,
	description: "Bánh tráng nhập khẩu Việt Nam",
	imageUrl: "images\\banhtrang.jpg",
	mount: 3
},
{
	title: "Hạt nêm Knorr 500g",
	price: 600,
	description: "Hạt nêm Knorr nhập khẩu Việt Nam",
	imageUrl: "images\\hatnemknorr.jpg",
	mount: 7
},
{
	title: "Muối Hảo Hảo 350g",
	price: 650,
	description: "Muối Hảo Hảo nhập khẩu Việt Nam",
	imageUrl: "images\\muoihaohao.jpg",
	mount: 8
},
{
	title: "Mì Hảo Hảo",
	price: 99,
	description: "Mì Hảo Hảo nhập khẩu Việt Nam",
	imageUrl: "images\\mihaohao.jpg",
	mount: 20
},
{
	title: "Mì Omachi",
	price: 120,
	description: "Mì Omachi nhập khẩu Việt Nam",
	imageUrl: "images\\miomachi.jpg",
	mount: 20
},
{
	title: "Phở Vifon",
	price: 150,
	description: "Phở Vifon nhập khẩu Việt Nam",
	imageUrl: "images\\phovifon.jpg",
	mount: 30
},
{
	title: "Sa tế tôm",
	price: 250,
	description: "Sa tế tôm nhập khẩu Việt Nam",
	imageUrl: "images\\satetom.jpg",
	mount: 10
	
},
{
	title: "Bánh phồng tôm",
	price: 450,
	description: "Bánh phồng tôm nhập khẩu Việt Nam",
	imageUrl: "images\\banhphongtom.jpg",
	mount: 20
},
{
	title: "Bún khô",
	price: 270,
	description: "Bún khô tôm nhập khẩu Việt Nam",
	imageUrl: "images\\bunkho.jpg",
	mount: 5
}
];

var eventObj = [

    {
        title: "Mừng Xuân 2020",
        startDate: new Date("2019-12-20T00:00:00.000+00:00"),
        endDate: new Date("2020-01-10T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Mừng Xuân 2020 giảm 10% khi mua hàng online(20/12/2019 ~ 10/01/2020)",
        imageUrl: "images\sukienxuan2020.jpg"
    },
    {
        title: "Mừng ngày Phụ  Nữ 8/3/2020",
        startDate: new Date("2020-03-08T00:00:00.000+00:00"),
        endDate: new Date("2020-03-10T00:00:00.000+00:00"),
        hasCoupon: true,
        coupon: "PHUNU0803",
        description: "Mừng ngày Phụ  Nữ 8/3, nhập mã PHUNU0803 để giảm 15% khi mua hàng online trên 10000 yên(08/03/2020 ~ 10/03/2020)",
        imageUrl: "images\phunu08032020.jpg"
    },
    {
        title: "Mừng ngày 30/4/2020",
        startDate: new Date("2020-04-30T00:00:00.000+00:00"),
        endDate: new Date("2020-05-01T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Mừng ngày 30/4/2020 giảm 10% khi mua hàng online(30/04/2020 ~ 01/05/2020)",
        imageUrl: "images\mung30042020.jpg"
    },
    {
        title: "Mừng ngày Nhà Giáo Việt Nam 20/11/2020",
        startDate: new Date("2020-11-19T00:00:00.000+00:00"),
        endDate: new Date("2020-11-22T00:00:00.000+00:00"),
        hasCoupon: true,
        coupon: "NHAGIAO2011",
        description: "Mừng ngày Nhà Giáo Việt Nam 20/11/2020, nhập mã NHAGIAO2011 để giảm 10% khi mua hàng online(19/11/2020 ~ 22/11/2020)",
        imageUrl: "images\nhagiao20112020.jpg"
    },
    {
        title: "Giảm giá cuối năm",
        startDate: new Date("2020-12-01T00:00:00.000+00:00"),
        endDate: new Date("2020-12-19T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Giảm giá cuối năm 20% trên tổng hóa đơn khi mua hàng online(01/12/2020 ~ 19/12/2020)",
        imageUrl: "images\giamgiacuoinam2020.jpg"
    },
    {
        title: "Mừng Xuân 2021",
        startDate: new Date("2020-12-20T00:00:00.000+00:00"),
        endDate: new Date("2021-01-10T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Mừng Xuân 2021 giảm 10% khi mua hàng online(20/12/2020 ~ 10/01/2021)",
        imageUrl: "images\sukienxuan2020.jpg"
    },
    {
        title: "Mừng ngày Phụ  Nữ 8/3/2021",
        startDate: new Date("2021-03-08T00:00:00.000+00:00"),
        endDate: new Date("2021-03-10T00:00:00.000+00:00"),
        hasCoupon: true,
        coupon: "PHUNU0803",
        description: "Mừng ngày Phụ  Nữ 8/3, nhập mã PHUNU0803 để giảm 15% khi mua hàng online trên 10000 yên(08/03/2021 ~ 10/03/2021)",
        imageUrl: "images\phunu08032021.jpg"
    },
    {
        title: "Mừng ngày 30/4/2021",
        startDate: new Date("2021-04-30T00:00:00.000+00:00"),
        endDate: new Date("2021-05-01T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Mừng ngày 30/4/2021 giảm 10% khi mua hàng online(30/04/2021 ~ 01/05/2021)",
        imageUrl: "images\mung30042021.jpg"
    },
    {
        title: "Mừng ngày Nhà Giáo Việt Nam 20/11/2021",
        startDate: new Date("2021-11-19T00:00:00.000+00:00"),
        endDate: new Date("2021-11-22T00:00:00.000+00:00"),
        hasCoupon: true,
        coupon: "NHAGIAO2011",
        description: "Mừng ngày Nhà Giáo Việt Nam 20/11/2021, nhập mã NHAGIAO2011 để giảm 10% khi mua hàng online(19/11/2021 ~ 22/11/2021)",
        imageUrl: "images\nhagiao20112021.jpg"
    },
    {
        title: "Giảm giá cuối năm",
        startDate: new Date("2021-12-01T00:00:00.000+00:00"),
        endDate: new Date("2021-12-19T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Giảm giá cuối năm 20% trên tổng hóa đơn khi mua hàng online(01/12/2021 ~ 19/12/2021)",
        imageUrl: "images\giamgiacuoinam2021.jpg"
    },
    {
        title: "Mừng Xuân 2022",
        startDate: new Date("2021-12-20T00:00:00.000+00:00"),
        endDate: new Date("2022-01-10T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Mừng Xuân 2022 giảm 10% khi mua hàng online(20/12/2021 ~ 10/01/2022)",
        imageUrl: "images\sukienxuan2020.jpg"
    },
    {
        title: "Mừng ngày Phụ  Nữ 8/3/2022",
        startDate: new Date("2022-03-08T00:00:00.000+00:00"),
        endDate: new Date("2022-03-10T00:00:00.000+00:00"),
        hasCoupon: true,
        coupon: "PHUNU0803",
        description: "Mừng ngày Phụ  Nữ 8/3, nhập mã PHUNU0803 để giảm 15% khi mua hàng online trên 10000 yên(08/03/2022 ~ 10/03/2022)",
        imageUrl: "images\phunu08032022.jpg"
    },
    {
        title: "Mừng ngày 30/4/2022",
        startDate: new Date("2022-04-30T00:00:00.000+00:00"),
        endDate: new Date("2022-05-01T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Mừng ngày 30/4/2022 giảm 10% khi mua hàng online(30/04/2022 ~ 01/05/2022)",
        imageUrl: "images\mung30042022.jpg"
    },
    {
        title: "Mừng ngày Nhà Giáo Việt Nam 20/11/2022",
        startDate: new Date("2022-11-19T00:00:00.000+00:00"),
        endDate: new Date("2022-11-22T00:00:00.000+00:00"),
        hasCoupon: true,
        coupon: "NHAGIAO2011",
        description: "Mừng ngày Nhà Giáo Việt Nam 20/11/2022, nhập mã NHAGIAO2011 để giảm 10% khi mua hàng online(19/11/2022 ~ 22/11/2022)",
        imageUrl: "images\nhagiao20112022.jpg"
    },
    {
        title: "Giảm giá cuối năm",
        startDate: new Date("2022-12-01T00:00:00.000+00:00"),
        endDate: new Date("2022-12-19T00:00:00.000+00:00"),
        hasCoupon: false,
        coupon: "",
        description: "Giảm giá cuối năm 20% trên tổng hóa đơn khi mua hàng online(01/12/2022 ~ 19/12/2022)",
        imageUrl: "images\giamgiacuoinam2022.jpg"
    },
];

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myShopDB");
  //Create a collection name "customers":
  dbo.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("users's collection created!");
  });
  dbo.createCollection("products", function(err, res) {
    if (err) throw err;
    console.log("products's collection created!");
  });
  dbo.createCollection("events", function(err, res) {
    if (err) throw err;
    console.log("events's collection created!");
  });
  dbo.createCollection("oders", function(err, res) {
    if (err) throw err;
    console.log("oders's Collection created!");
  });


  dbo.collection("users").insertMany(userObj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
  dbo.collection("products").insertMany(productObj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
  dbo.collection("events").insertMany(eventObj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
  });
//   db.close();

});
