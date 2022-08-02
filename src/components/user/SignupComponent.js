import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Form,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

import Event from "../EventComponent";

import { getAddressByZip } from "japan-address-autofill";

// const backendPath = "http://localhost:4000";
const backendPath = "https://webbanhang-backend.herokuapp.com";
const baseUrl = "/assets/";

// const redirect = useNavigate();

const Signup = (props) => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isExistEmail, setisExistEmaill] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [doB, setdoB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");

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

  // useEffect(() => {
  //   alert("useEffect has been called!");
  // }, []);

  const fetchCheckEmailExist = (email) => {
    setisExistEmaill("false");
    fetch(backendPath + "/client/checkEmailExist", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // alert("result " + (JSON.stringify(data)));
        setisExistEmaill(JSON.stringify(data));
      })
      .catch((error) => console.log(error.message));
  };

  function validateForm() {
    // const required = (val) => val && val.length;
    const maxLength = (val, len) => !val || val.length <= len;
    const minLength = (val, len) => val && val.length >= len;
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    const {
      email,
      password,
      confirmPassword,
      name,
      doB,
      phoneNumber,
      postcode,
      address,
    } = form;
    const newErrors = {};

    if (!name || name === "") {
      newErrors.name = "Xin nhập tên khách hàng!";
    } else if (isNumber(name)) {
      newErrors.name = "Xin nhập tên là ký tự chữ viết";
    } else if (!minLength(name, 2)) {
      newErrors.name = "Xin nhập tên là nhiều hơn 2 ký tự chữ viết";
    }
    // alert("isExistEmail  " + isExistEmail);
    if (!email || email === "") {
      newErrors.email = "Xin nhập email!";
    } else if (!validEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    } else if (isExistEmail === "true") {
      newErrors.email = "Email đã tồn tại";
    }

    if (!password || password === "") {
      newErrors.password = "Xin nhập mật khẩu!";
    } else if (!minLength(password, 3)) {
      newErrors.password = "Xin nhập mật khẩu lớn hơn 3 ký tự";
    }

    if (!confirmPassword || confirmPassword === "") {
      newErrors.confirmPassword = "Xin xác nhận mật khẩu!";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp";
    }

    if (!doB || doB === "") {
      newErrors.doB = "Xin nhập ngày sinh!";
    }

    if (!phoneNumber || phoneNumber === "") {
      newErrors.phoneNumber = "Xin nhập số điện thoại!";
    } else if (!isNumber(Number(phoneNumber))) {
      newErrors.phoneNumber = "Xin nhập số điện thoại là chữ số";
    } else if (!minLength(phoneNumber, 10)) {
      newErrors.phoneNumber = "Xin nhập số điện thoại là 10 chữ số";
    } else if (!maxLength(phoneNumber, 11)) {
      newErrors.phoneNumber = "Xin nhập số điện thoại là 10 chữ số";
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

    if (!address || address === "") {
      newErrors.address = "Xin nhập địa chỉ";
    }

    return newErrors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCheckEmailExist(email);
    const signupAccountInfo = {
      email: email,
      password: password,
      name: name,
      doB: doB,
      phoneNumber: phoneNumber,
      postcode: postcode,
      address: address,
    };

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      //
      setErrors(formErrors);
      //
      navigate("/dangky");
    } else {
      // alert("Gửi đăng ký tài khoản");
      //
      props.fetchSignupAccountInfo(signupAccountInfo);
      //
      handleResetButton();
      //
      navigate("/dangnhap");
    }
  };

  function handlePostCodechange(e) {
    const isSevenNumber = (val, len) => val && val.length === len;
    if (isSevenNumber(e.target.value, 7)) {
      getAddressByZip(e.target.value).then((response) => {
        let address =
          response.prefecture + " " + response.city + " " + response.area + " ";
        setAddress(address);
        setField("address", address);
      });
      setPostcode(e.target.value);
      // {"region":"中国","prefecture":"広島県","city":"広島市西区","area":"庚午中"}
    }
  }

  function handleResetButton() {
    setName("");
    setdoB("");
    setEmail("");
    setPhoneNumber("");
    setPostcode("");
    setAddress("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setForm({});
    setisExistEmaill(null);
  }

  return (
    <Container>
      <Row className="col-md-12">
        <Col
          sm={{ span: 10, offset: 3 }}
          md={{ span: 10, offset: 3 }}
          lg={{ span: 10, offset: 2 }}
        >
          <h2 className="text-center">Đăng Ký Tài Khoản</h2>
        </Col>
      </Row>
      <Row className="mt-3">
        {/* <Col xs={1} md={2} lg={3}></Col> */}
        <Col
          sm={{ span: 11, offset: 1 }}
          md={{ span: 10, offset: 1 }}
          lg={{ span: 7, offset: 2 }}
        >
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.email && "red-border"}
                  onChange={(event) => {
                    setField("email", event.target.value);
                    setEmail(event.target.value);
                  }}
                  onBlur={(event) => {
                    fetchCheckEmailExist(event.target.value);
                  }}
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Xin nhập Email đăng ký"
                  isInvalid={!!errors.email}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="password">
              <Form.Label column sm={3}>
                Mật khẩu
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.password && "red-border"}
                  onChange={(event) => {
                    setField("password", event.target.value);
                    setPassword(event.target.value);
                  }}
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Xin nhập mật khẩu đăng ký"
                  isInvalid={!!errors.password}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
              <Form.Label column sm={3}>
                Xác nhận MK
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.confirmPassword && "red-border"}
                  onChange={(event) => {
                    setField("confirmPassword", event.target.value);
                    setConfirmPassword(event.target.value);
                  }}
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Xin xác nhận mật khẩu đăng ký"
                  isInvalid={!!errors.confirmPassword}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm={3}>
                Tên
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.name && "red-border"}
                  onChange={(event) => {
                    setField("name", event.target.value);
                    setName(event.target.value);
                  }}
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Xin nhập Tên Khách Hàng đăng ký"
                  isInvalid={!!errors.name}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="doB">
              <Form.Label column sm={3}>
                Ngày sinh
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.doB && "red-border"}
                  onChange={(event) => {
                    setField("doB", event.target.value);
                    setdoB(event.target.value);
                  }}
                  type="date"
                  name="doB"
                  value={doB}
                  placeholder=""
                  isInvalid={!!errors.doB}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.doB}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
              <Form.Label column sm={3}>
                Điện thoại
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.phoneNumber && "red-border"}
                  onChange={(event) => {
                    setField("phoneNumber", event.target.value);
                    setPhoneNumber(event.target.value);
                  }}
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder="Số điện thoại 10 chữ số"
                  isInvalid={!!errors.phoneNumber}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
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
                  type="text"
                  name="postcode"
                  value={postcode}
                  placeholder="Mã bưu điện 7 chữ số"
                  isInvalid={!!errors.postcode}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.postcode}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="address">
              <Form.Label column sm={3}>
                Địa chỉ
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={!!errors.address && "red-border"}
                  onChange={(event) => {
                    setField("address", event.target.value);
                    setAddress(event.target.value);
                  }}
                  type="text"
                  name="address"
                  value={address}
                  placeholder="Xin nhập địa chỉ"
                  isInvalid={!!errors.address}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 3 }}>
                <Button className="btn btn-primary" type="submit">Đăng Ký</Button>
                <Button
                  type="button"
                  className="btn btn-success ml-3"
                  onClick={() => {
                    handleResetButton();
                  }}
                >
                  Reset
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        {/* <Col xs={1} md={2} lg={3}></Col> */}
      </Row>
    </Container>
  );
};

export default Signup;
