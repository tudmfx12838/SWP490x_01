import React, { useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
} from "react-bootstrap";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Event from "./EventComponent";

const baseUrl = "/assets/";


const TrackingOrder = (props) => {

  const [quantity, setQuantity] = useState(0);

  return (
    <Container>

    </Container>
  );
};

export default TrackingOrder;
