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

const baseUrl = "/assets/";

const ResetPassword = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isExistEmail, setisExistEmaill] = useState("");

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


  const fetchCheckEmailExist = (email) => {
    setisExistEmaill("false");
    fetch("http://localhost:4000/client/checkEmailExist", {
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

    const { email } = form;
    const newErrors = {};

    // alert("isExistEmail  " + isExistEmail);
    if (!email || email === "") {
      newErrors.email = "Xin nhập email!";
    } else if (!validEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    } else if (isExistEmail === "false") {
      newErrors.email = "Email không tồn tại";
    }

    return newErrors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCheckEmailExist(email);
    const emailnInfo = {
      email: email,
    };

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      //
      setErrors(formErrors);
      //
      navigate("/khoiphucmatkhau");
    } else {
      // alert("Gửi đăng ký tài khoản");
      //
      props.fetchConfirmBeforeResetPassword(emailnInfo);
      //
      handleResetButton();
      //
      navigate("/");
    }
  };

  function handleResetButton() {
    setEmail("");
    setErrors({});
    setForm({});
    setisExistEmaill(null);
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
                  placeholder="Xin nhập Email"
                  isInvalid={!!errors.email}
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 3 }}>
                <Button type="submit">Xác nhận</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
