import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Row,
  Table,
  Image,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
  Col,
} from "react-bootstrap";

import { Formik } from "formik";
import { getAddressByZip } from "japan-address-autofill";
import axios from "axios";

// const backendPath = "http://localhost:4000";
const backendPath = "https://webbanhang-backend.herokuapp.com";

const Order = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [addressFromPostCode, setAddressFromPostCode] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputNode, setInputNode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [existCoupon, setIsExistCoupon] = useState({
    result: true,
    discount: 0,
  });

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  useEffect(() => {
    if (props.auth.auth.isLoggedIn && props.user.user.user !== null) {
      setName(props.user.user.user.name);
      setEmail(props.user.user.user.email);
      setNumber(props.user.user.user.phoneNumber);
      const postcode = props.user.user.user.address.substring(1, 8);
      const address = props.user.user.user.address.substring(
        9,
        props.user.user.user.address.length
      );
      setPostcode(postcode);
      setAddressFromPostCode(address);
      setInputAddress(address);
      setInputNode("");
      setCoupon("");
      // setErrors({});
      // setForm({});
      var newForm = {};

      newForm.name = props.user.user.user.name;
      newForm.email = props.user.user.user.email;
      newForm.number = props.user.user.user.phoneNumber;
      newForm.postcode = postcode;
      newForm.address1 = address;
      newForm.address2 = address;

      setForm(newForm);
      setErrors({});
    } else {
      handleResetButton();
    }
  }, [props.auth.auth, props.user.user]);

  function validateForm() {
    // const required = (val) => val && val.length;
    const maxLength = (val, len) => !val || val.length <= len;
    const minLength = (val, len) => val && val.length >= len;
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    const { name, email, number, postcode, address1, address2, coupon } = form;
    const newErrors = {};

    if (!name || name === "") {
      newErrors.name = "Xin nhập tên khách hàng!";
    } else if (isNumber(name)) {
      newErrors.name = "Xin nhập tên là ký tự chữ viết";
    } else if (!minLength(name, 2)) {
      newErrors.name = "Xin nhập tên là nhiều hơn 2 ký tự chữ viết";
    }

    if (!email || email === "") {
      newErrors.email = "Xin nhập email!";
    } else if (!validEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!number || number === "") {
      newErrors.number = "Xin nhập số điện thoại!";
    } else if (!isNumber(Number(number))) {
      newErrors.number = "Xin nhập số điện thoại là chữ số";
    } else if (!minLength(number, 10)) {
      newErrors.number = "Xin nhập số điện thoại là 10 chữ số";
    } else if (!maxLength(number, 11)) {
      newErrors.number = "Xin nhập số điện thoại là 10 chữ số";
    }

    if (!postcode || postcode === "") {
      newErrors.postcode = "Xin nhập mã bưu điện";
    } else if (!isNumber(Number(postcode))) {
      newErrors.postcode = "Xin nhập mã bưu điện là chữ số";
    } else if (!minLength(postcode, 7)) {
      newErrors.postcode = "Xin nhập mã bưu điện là 7 chữ số";
    } else if (!maxLength(postcode, 8)) {
      newErrors.postcode = "Xin nhập mã bưu điện là 7 chữ số";
    }

    if (!address1 || address1 === "") {
      newErrors.address1 = "Xin nhập địa chỉ tỉnh/thành";
    }
    if (!address2 || address2 === "") {
      newErrors.address2 = "Xin nhập địa chỉ đường/số nhà";
    }

    if (!existCoupon.result) {
      newErrors.coupon = "Mã giảm giá không hợp lệ";
    }

    return newErrors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(coupon === ""){
      // alert("call me" + coupon);
      setIsExistCoupon({
        result: true,
        discount: 0,
      });
    }

    const products = ListCart.map((item) => {
      return {
        productId: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl,
      };
    });

    const authen = props.auth.auth.isLoggedIn && props.user.user.user !== null;
    const orderInfo = {
      sessionId: !authen ? null : props.auth.auth.sessionId,
      name: name,
      email: email,
      number: number,
      postcode: postcode,
      addressFromPostCode: addressFromPostCode,
      inputAddress: inputAddress,
      inputNode: inputNode,
      products: products,
      coupon: {
        name: coupon === null ? "" : coupon,
        discount: coupon === null ? 0 : existCoupon.discount,
      },
    };

    // alert(JSON.stringify(form));
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      alert("Form submitted");
      props.fetchOrderInfo(orderInfo);
    }
  };

  function handlePostCodechange(e) {
    const isSevenNumber = (val, len) => val && val.length === len;
    if (isSevenNumber(e.target.value, 7)) {
      getAddressByZip(e.target.value).then((response) => {
        let address =
          response.prefecture + " " + response.city + " " + response.area + " ";
        setAddressFromPostCode(address);
        setField("address1", address);
      });
      setPostcode(e.target.value);
      // {"region":"中国","prefecture":"広島県","city":"広島市西区","area":"庚午中"}
      // alert(addressFromPostCode);
    }
  }

  // Chưa hoàn thiện ...
  function handleCheckCouponExist(coupon, inform) {
    // alert(coupon);
    if (coupon === "" && inform) {
      alert("Xin nhập mã giảm giá để kiểm tra!");
      setIsExistCoupon({ result: true, discount: 0 });
    } else {
      fetch(backendPath + "/client/checkCouponExist", {
        method: "POST",
        body: JSON.stringify({ coupon: coupon }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          // alert("result " + JSON.stringify(data));
          if (inform) {
            alert(response.inform);
          }
          if (response.result === "false" || response.result === "expired") {
            setIsExistCoupon({ result: false, discount: response.discount });
          } else if (response.result === "true") {
            setIsExistCoupon({ result: true, discount: response.discount });
          }
        })
        .catch((error) => console.log(error.message));
    }
  }

  function handleResetButton() {
    if (props.auth.auth.isLoggedIn && props.user.user.user !== null) {
      setName(props.user.user.user.name);
      setEmail(props.user.user.user.email);
      setNumber(props.user.user.user.phoneNumber);
      const postcode = props.user.user.user.address.substring(1, 8);
      const address = props.user.user.user.address.substring(
        9,
        props.user.user.user.address.length
      );
      setPostcode(postcode);
      setAddressFromPostCode(address);
      setInputAddress(address);
      setInputNode("");
      setCoupon("");
      // setErrors({});
      // setForm({});
      var newForm = {};

      newForm.name = props.user.user.user.name;
      newForm.email = props.user.user.user.email;
      newForm.number = props.user.user.user.phoneNumber;
      newForm.postcode = postcode;
      newForm.address1 = address;
      newForm.address2 = address;

      setForm(newForm);
      setIsExistCoupon({
        result: true,
        discount: 0,
      });
    } else {
      setName("");
      setEmail("");
      setNumber("");
      setPostcode("");
      setAddressFromPostCode("");
      setInputAddress("");
      setInputNode("");
      setCoupon("");
      setErrors({});
      setForm({});
      setIsExistCoupon({
        result: true,
        discount: 0,
      });
    }
  }

  let ListCart = [];
  let TotalCart = 0;
  Object.keys(props.cart.Carts).forEach(function (item) {
    TotalCart += props.cart.Carts[item].quantity * props.cart.Carts[item].price;
    ListCart.push(props.cart.Carts[item]);
  });
  function TotalPrice(price, quantity) {
    return Number(price * quantity).toLocaleString("en-US");
  }

  let order = [];

  if (ListCart.length > 0) {
    return (
      <React.Fragment>
        <Container>
          <Row className="col-md-12">
            <h1 className="text-center">Thông Tin Giao Hàng</h1>
          </Row>

          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm={3}>
                Tên
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.name && "red-border"}
                  // onBlur={(event) => {
                  //   setName(event.target.value);
                  // }}
                  onChange={(event) => {
                    setField("name", event.target.value);
                    setName(event.target.value);
                  }}
                  placeholder="Xin nhập tên Khách Hàng"
                  type="text"
                  // id="name"
                  name="name"
                  required
                  value={name}
                  // defaultValue={name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  // disabled={props.auth.auth.isLoggedIn && props.user.user.user !== null ? true : false}
                  className={!!errors.email && "red-border"}
                  // onBlur={(event) => {
                  //   setEmail(event.target.value);
                  // }}
                  onChange={(event) => {
                    setField("email", event.target.value);
                    setEmail(event.target.value);
                  }}
                  placeholder="Xin nhập Email Khách Hàng"
                  type="text"
                  // id="email"
                  name="email"
                  value={email}
                  // defaultValue={email}
                  required
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="number">
              <Form.Label column sm={3}>
                Điện thoại
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.number && "red-border"}
                  // onBlur={(event) => {
                  //   setNumber(event.target.value);
                  // }}
                  onChange={(event) => {
                    setField("number", event.target.value);
                    setNumber(event.target.value);
                  }}
                  placeholder="Số điện thoại 10 chữ số(vd: 09078950191)"
                  type="text"
                  // id="number"
                  name="number"
                  value={number}
                  required
                  isInvalid={!!errors.number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.number}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="postcode">
              <Form.Label column sm={3}>
                Mã bưu điện
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.postcode && "red-border"}
                  onBlur={(e) => {
                    handlePostCodechange(e);
                  }}
                  onKeyDown={(e) => {
                    handlePostCodechange(e);
                  }}
                  onChange={(event) => {
                    setField("postcode", event.target.value);
                    setPostcode(event.target.value);
                  }}
                  placeholder="Mã bưu điện 7 chữ số(vd: 7330822)"
                  type="text"
                  // id="postcode"
                  name="postcode"
                  value={postcode}
                  required
                  isInvalid={!!errors.postcode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.postcode}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="address1">
              <Form.Label column sm={3}>
                Tỉnh/Thành
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.address1 && "red-border"}
                  // onBlur={(event) => {
                  //   setAddressFromPostCode(event.target.value);
                  // }}
                  onChange={(event) => {
                    setField("address1", event.target.value);
                    setAddressFromPostCode(event.target.value);
                  }}
                  placeholder="Xin nhập địa chỉ Tỉnh/Thành"
                  type="text"
                  // id="address1"
                  name="address1"
                  value={addressFromPostCode}
                  required
                  isInvalid={!!errors.address1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address1}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="address2">
              <Form.Label column sm={3}>
                Đường/Số nhà
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.address2 && "red-border"}
                  // onBlur={(event) => {
                  //   setInputAddress(event.target.value);
                  // }}
                  onChange={(event) => {
                    setField("address2", event.target.value);
                    setInputAddress(event.target.value);
                  }}
                  placeholder="Xin nhập địa chỉ Đường/Số nhà"
                  type="text"
                  // id="address2"
                  name="address2"
                  value={inputAddress}
                  required
                  isInvalid={!!errors.address2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address2}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="coupon">
              <Form.Label column sm={3}>
                Mã giảm giá
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  className={!!errors.coupon && "red-border"}
                  onChange={(event) => {
                    setField("coupon", event.target.value);
                    setCoupon(event.target.value);
                  }}
                  onBlur={(event) => {
                    handleCheckCouponExist(coupon, false);
                  }}
                  placeholder="Nhập mã giảm giá (nếu có)"
                  type="text"
                  // id="coupon"
                  name="coupon"
                  value={coupon}
                  // required
                  isInvalid={!!errors.coupon}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.coupon}
                </Form.Control.Feedback>
              </Col>
              <Col sm={3}>
                <Button
                  type="button"
                  onClick={() => {
                    handleCheckCouponExist(coupon, true);
                  }}
                >
                  Kiểm tra
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="node">
              <Form.Label column sm={3}>
                Ghi chú
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  // onBlur={(event) => {
                  //   setInputNode(event.target.value);
                  // }}
                  onChange={(event) => {
                    setField("node", event.target.value);
                    setInputNode(event.target.value);
                  }}
                  // id="node"
                  name="node"
                  value={inputNode}
                  as="textarea"
                  rows={3}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="notePoint">
              <Form.Label column sm={3}>
                Lưu ý:
              </Form.Label>
              <Col sm={9}>
                <h5>-Hình thức thanh toán chuyển khoản</h5>
                <h5>-Ngân hàng: Yuchou</h5>
                <h5>-Chủ khoản: Dang Minh Tu</h5>
                <h5>-STK: 1234567890</h5>
              </Col>
            </Form.Group>

            <Table className="table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {ListCart.map((item, key) => {
                  let product = item._id;
                  let quantity = item.quantity;
                  order.push({
                    product: product,
                    quantity: quantity,
                    totalCash: TotalPrice(item.price, item.quantity),
                  });

                  return (
                    <tr key={key}>
                      <td>{item.title}</td>
                      <td>
                        <Image
                          src={"/assets/" + item.imageUrl}
                          style={{ width: "100px", height: "80px" }}
                        />
                      </td>
                      <td>{item.price} ￥</td>
                      <td>{item.quantity}</td>
                      <td>{TotalPrice(item.price, item.quantity)} ￥</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="4">Tổng</td>
                  <td>{Number(TotalCart).toLocaleString("en-US")} ￥</td>
                </tr>
                <tr>
                  <td colSpan="4">Giảm giá</td>
                  <td>{existCoupon.discount * 100} %</td>
                </tr>
                <tr>
                  <td colSpan="4">Thành Tiền</td>
                  <td>{TotalCart - existCoupon.discount * TotalCart} ￥</td>
                </tr>
              </tbody>
            </Table>

            <Button type="submit">Đặt hàng</Button>
            <Button
              type="button"
              className="btn btn-success"
              onClick={() => {
                handleResetButton();
              }}
            >
              Reset
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <Container>
        <Row>
          <h1>Không có đơn đặt hàng!</h1>
        </Row>
      </Container>
    );
  }
};

export default Order;
