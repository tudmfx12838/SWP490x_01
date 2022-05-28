const {check} = require('express-validator');

let validateAddOrEditProduct = () => {
  return [ 
    check('title', 'Xin nhập tên sản phẩm').not().isEmpty(),
    check('title', 'Tên sản phẩm dài hơn 2 ký tự').isLength({ min: 2 }),
    check('price', 'Giá sản phẩm phải lớn hơn 0').isInt({ min:1}),
    check('mount', 'Xin nhập số lượng sản phẩm').not().isEmpty(),
    check('description', 'Xin nhập mô tả sản phẩm').not().isEmpty(),
    check('description', 'Xin nhập mô tả lớn hơn bằng 5 ký tự').isLength({ min: 5 }),
  ]; 
}

let validateAddOrEditEvent = () => {
  return [ 
    check('user.email', 'Invalid does not Empty').not().isEmpty(),
    check('user.email', 'Invalid email').isEmail(),
    check('user.password', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

let validate = {
    validateAddOrEditProduct: validateAddOrEditProduct,
    validateAddOrEditEvent: validateAddOrEditEvent
};

module.exports = {validate};
