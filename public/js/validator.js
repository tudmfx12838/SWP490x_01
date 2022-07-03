const { check } = require("express-validator");
const User = require("../../models/user");
const Order = require("../../models/order");

let validateAddOrEditProduct = () => {
  return [
    check("title", "Xin nhập tên sản phẩm").not().isEmpty(),
    check("title", "Tên sản phẩm dài hơn 2 ký tự").isLength({ min: 2 }),
    check("price", "Giá sản phẩm phải lớn hơn 0").isInt({ min: 1 }),
    check("mount", "Xin nhập số lượng sản phẩm").not().isEmpty(),
    check("description", "Xin nhập mô tả sản phẩm").not().isEmpty(),
    check("description", "Xin nhập mô tả lớn hơn bằng 5 ký tự").isLength({
      min: 5,
    }),
  ];
};

let validateAddOrEditUser = () => {
  return [
    check("email", "Xin nhập email").not().isEmpty(),
    check("email", "Email không hợp lệ").isEmail(),
    check("email").custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            //them loi xac thuc khong dong bo
            "Email này đã tồn tại!"
          );
        }
      });
    }),
    check("password", "Xin nhập mật khẩu").not().isEmpty(),
    check("password", "Xin nhập mật khẩu dài hơn 3 ký tự").isLength({ min: 3 }),
    check("passwordConfirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Mật khẩu không trùng khớp");
      }
      return true;
    }),
    check("permission", "Xin nhập mật khẩu quyền truy cập").not().isEmpty(),
    check("name", "Xin nhập tên người dùng").not().isEmpty(),
    check("name", "Tên người dùng dài hơn 2 ký tự").isLength({ min: 2 }),
    check("doB", "Xin nhập ngày sinh").not().isEmpty(),
    check("phoneNumber", "Xin nhập số điện thoại").not().isEmpty(),
    check("phoneNumber", "Xin nhập số điện thoại là chữ số").isNumeric(),
    check("phoneNumber", "Xin nhập số điện thoại là 10 chữ số").isLength({ min: 10, max: 10 }),
    check("postcode", "Xin nhập mã bưu điện").not().isEmpty(),
    check("postcode", "Xin nhập mã bưu điện là chữ số").isNumeric(),
    check("postcode", "Xin nhập mã bưu điện là 7 chữ số").isLength({ min: 7, max: 7 }),
    check("address", "Xin nhập địa chỉ khách hàng").not().isEmpty(),
    check("point", "Xin nhập điểm tích lũy").not().isEmpty(),
  ];
};

let validateAddOrEditEvent = () => {
  return [
    // check('user.email', 'Invalid does not Empty').not().isEmpty(),
    // check('user.email', 'Invalid email').isEmail(),
    // check('user.password', 'password more than 6 degits').isLength({ min: 6 })
  ];
};

let validateLogin = () => {
  return [
    check("email", "Xin nhập email đăng nhập").not().isEmpty(),
    check("email", "Email không hợp lệ").isEmail(),
    check("email").custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (!userDoc) {
          return Promise.reject(
            //them loi xac thuc khong dong bo
            "Email này không tồn tại!"
          );
        }else if(userDoc.permission !== "admin"){
          return Promise.reject(
            //them loi xac thuc khong dong bo
            "Xin nhập Email quản trị viên"
          );
        }
      });
    }),
    check("password", "Xin nhập mật khẩu").not().isEmpty(),
  ];
};

// let validateConfirmOrder = () => {
//   return [
//     check("_id").custom((value, { req }) => {
//       return Order.findOne({ _id: value }).then((orderDoc) => {
//         if (!orderDoc) {
//           return Promise.reject(
//             //them loi xac thuc khong dong bo
//             "Đơn hàng này không tồn tại"
//           );
//         }else if(orderDoc.cashInfo.isPaid === false){
//           return Promise.reject(
//             //them loi xac thuc khong dong bo
//             "Không thể xác nhận đơn hàng chưa thanh toán"
//           );
//         }
//       });
//     }),
//   ];
// };

let validate = {
  validateAddOrEditProduct: validateAddOrEditProduct,
  validateAddOrEditEvent: validateAddOrEditEvent,
  validateLogin: validateLogin,
  validateAddOrEditUser: validateAddOrEditUser,
  // validateConfirmOrder: validateConfirmOrder,
};

module.exports = { validate };
