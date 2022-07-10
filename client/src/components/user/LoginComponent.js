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

const Login = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isExistEmail, setisExistEmaill] = useState("");
  const [password, setPassword] = useState("");

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

  const getCSRFToken = async () => {
    const response = await axios.get(
      "http://localhost:4000/client/getCSRFToken"
    );
    axios.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken;
  };
  // fetch("http://localhost:4000/client/getCSRFToken")
  //   .then((res) => {
  //     alert(res.data.CSRFToken);
  //   })
  //   .catch((error) => console.log(error.message));
  // useEffect(() => {
  //   alert("changed");
  //   getCSRFToken();
  // });
  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get("http://localhost:4000/client/getCSRFToken");
  //     axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
  //   };
  //   getCsrfToken();
  // }, []);

  useEffect(() => {
    
    // alert(JSON.stringify(props.user.user));
    // alert(JSON.stringify(props.auth.auth));
    if (props.user.user.status === "success") {
      //
      alert("Đăng nhập thành công ");
      //
      props.changeLoginStatus({ status: "logged", user: props.user.user.user });

      // props.UpdateUserCartToPageCart(props.user.user.user.cart);
      navigate("/");

    } else if (props.user.user.status === "failed") {
      //
      alert("Đăng nhập thất bại. Email hoặc mật khẩu không đúng!");
      //
      props.changeLoginStatus({ status: "idle", user: null });
      navigate("/dangnhap");
    }
  }, [navigate, props, props.user.user]);

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

    const { email, password } = form;
    const newErrors = {};

    // alert("isExistEmail  " + isExistEmail);
    if (!email || email === "") {
      newErrors.email = "Xin nhập email!";
    } else if (!validEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    } else if (isExistEmail === "false") {
      newErrors.email = "Email không tồn tại";
    }

    if (!password || password === "") {
      newErrors.password = "Xin nhập mật khẩu!";
    } else if (!minLength(password, 3)) {
      newErrors.password = "Xin nhập mật khẩu lớn hơn 3 ký tự";
    }

    return newErrors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCheckEmailExist(email);
    const loginInfo = {
      email: email,
      password: password,
    };

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      //
      setErrors(formErrors);
      //
      navigate("/dangnhap");
    } else {
      // alert("Gửi đăng ký tài khoản");
      //
      props.fetchUserLogin(loginInfo);
      //
      handleResetButton();
      //
      // alert("login status " + JSON.stringify(props.user.user));
      // navigate("/");
    }
  };

  function handleResetButton() {
    setEmail("");
    setPassword("");
    setErrors({});
    setForm({});
    setisExistEmaill(null);
  }

  if (!props.auth.auth.isLoggedIn) {
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
                    placeholder="Xin nhập Email đăng nhập"
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
              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 5, offset: 3 }}>
                  <Link to={"/dangky"}>Đăng Ký</Link>
                </Col>
                <Col sm={{ span: 5, offset: 3 }}>
                  <Link to={"/khoiphucmatkhau"}>Quên mật khẩu?</Link>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 3 }}>
                  <Button type="submit">Đăng Nhập</Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
          {/* <Col xs={1} md={2} lg={3}></Col> */}
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <h1>Đã đăng nhập!</h1>
        </Row>
      </Container>
    );
  }
};

export default Login;
