import React, { useState } from "react";
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
import Event from "./EventComponent";

const baseUrl = "/assets/";

const OrderHistory = (props) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <Container>
      <Form className="d-flex">
        <FormControl
          placeholder="Nhập mã đơn hàng cần kiểm tra"
          type="search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success" id="button-addon2">
          Kiểm tra
        </Button>
      </Form>
    </Container>
  );
};

export default OrderHistory;
