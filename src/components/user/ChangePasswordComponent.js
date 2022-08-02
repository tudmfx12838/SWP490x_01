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
import { Link, NavLink, useNavigate } from "react-router-dom";
import Event from "../EventComponent";

// const backendPath = "http://localhost:4000";
const backendPath = "https://webbanhang-backend.herokuapp.com";
const baseUrl = "/assets/";

const ChangePassword = (props) => {
  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  //   alert(props.token);

  // }, [props.token]);

  function validateForm() {
    // const required = (val) => val && val.length;
    const maxLength = (val, len) => !val || val.length <= len;
    const minLength = (val, len) => val && val.length >= len;
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    const { password, confirmPassword } = form;
    const newErrors = {};

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

    return newErrors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const changedpassword = {
      token: props.token,
      password: password,
    };

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      //
      setErrors(formErrors);
      //
    } else {
      //
      alert("Gửi thay đổi mật khẩu" + props.token);
      fetchChangeAccountPasswordWithToken(changedpassword);
      //
    }
  };

  function handleResetButton() {
    setPassword("");
    setConfirmPassword("");
    setField({});
    setErrors({});
    setForm({});
  }

  function fetchChangeAccountPasswordWithToken(changedpassword) {
    return fetch(backendPath + "/client/changeAccountPasswordWithToken", {
      method: "POST",
      body: JSON.stringify(changedpassword),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((respone) => respone.json())
      .then((respone) => {
        // alert(JSON.stringify(respone));
        if (respone.isEditted) {
          alert(respone.inform);
          navigate("/dangnhap");
        } else {
          alert(respone.inform);
          navigate("/khoiphucmatkhau");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container>
      <Row className="mt-3">
        {/* <Col xs={1} md={2} lg={3}></Col> */}
        <Col
          sm={{ span: 11, offset: 1 }}
          md={{ span: 10, offset: 1 }}
          lg={{ span: 7, offset: 2 }}
        >
          <Form onSubmit={(event) => handleSubmit(event)}>
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
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 3 }}>
                <Button type="submit">Đổi mật khẩu</Button>
                <Button
                  type="button"
                  className="btn btn-success ml-2"
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
      </Row>
    </Container>
  );
};

export default ChangePassword;
