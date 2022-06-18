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
import { Link, NavLink } from "react-router-dom";
import Event from "../EventComponent";
import mongoose from "mongoose";

const baseUrl = "/assets/";

const OrderHistory = (props) => {
  const [keyword, setKeyword] = useState("");

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

  function validateForm() {
    // const required = (val) => val && val.length;
    const maxLength = (val, len) => !val || val.length <= len;
    const minLength = (val, len) => val && val.length >= len;
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    const { keyword } = form;
    const newErrors = {};
    alert(keyword);
    if (!keyword || keyword === "") {
      newErrors.keyword = "Xin nhập mã đơn hàng muốn tìm!";
    } else if (!minLength(keyword, 24)) {
      newErrors.keyword = "Xin nhập mã đơn hàng là 24 ký tự";
    } else if (!maxLength(keyword, 24)) {
      newErrors.keyword = "Xin nhập mã đơn hàng là 24 v";
    }
    return newErrors;
  }

  const handleSubmit = (event) => {
    alert("called me");
    event.preventDefault();

    const searchInfo = {
      keyword: keyword,
    };

    // alert(JSON.stringify(form));
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      alert(JSON.stringify(errors));
    } else {
      alert("Form submitted");
      handleSearch(searchInfo);
    }
  };
  
  function RenderOrderHistoryResult(order) {
    
    if(order !== null){
      return (
        <Card>
          <Card.Header as="h5">{order._id}</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      );
    }else{
      return "null"
    }
    
  }

  function handleSearch() {
    alert("keyword + " + keyword);
    fetch("http://localhost:4000/client/checkOrderExist", {
      method: "POST",
      body: JSON.stringify({ orderCode: keyword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        alert("result " + JSON.stringify(response));
        // if (inform) {
        //   alert(response.inform);
        // }
        // if (response.result === "false" || response.result === "expired") {
        //   setIsExistCoupon({ result: false, discount: response.discount });
        // } else if (response.result === "true") {
        //   setIsExistCoupon({ result: true, discount: response.discount });
        // }
      })
      .catch((error) => console.log(error.message));
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
            <Form.Group as={Row} className="mb-3" controlId="keyword">
              <Col sm={9}>
                <FormControl
                  className={!!errors.keyword && "red-border"}
                  onChange={(event) => {
                    setField("keyword", event.target.value);
                    setKeyword(event.target.value);
                  }}
                  name="keyword"
                  value={keyword}
                  placeholder="Nhập mã đơn hàng cần kiểm tra"
                  type="text"
                  // required
                  isInvalid={!!errors.keyword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.keyword}
                </Form.Control.Feedback>
              </Col>

              <Col sm={3}>
                <Button
                  variant="outline-success"
                  id="button-search"
                  type="submit"
                >
                  Kiểm tra
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="mt-3">

      </Row>
    </Container>
  );
};

export default OrderHistory;
