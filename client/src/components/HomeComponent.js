import React, { Component, useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  CardGroup,
} from "react-bootstrap";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

const baseUrl = "/assets/";

function RenderHomeItem({ products, type }) {
  return (
    <>
      <Row xs={2} md={3} lg={5} className="g-4">
        {Array.from(products.slice(0, 5)).map((p, idx) => (
          <Col key={p._id}>
            <Card style={{}} className="mb-3">
              <Link to={`/sanpham/${type}/${p._id}`}>
                <Card.Img
                  variant="top"
                  src={baseUrl + p.imageUrl}
                  alt={p.title}
                  width={100}
                  height={150}
                />
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                </Card.Body>
              </Link>
              <Card.Footer>
                <Button variant="primary">Thêm</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

function RenderShowMore({ path }) {
  return (
    <Row>
      <Container>
        <Link to={path}>Xem thêm</Link>
      </Container>
    </Row>
  );
}

function RenderMenuHeader({ title, path }) {
  return (
    <Navbar bg="light" className="mt-3 mb-3">
      <Container>
        <Nav.Link as={NavLink} className="" to={path}>{title}</Nav.Link>
      </Container>
    </Navbar>
  );
}

const Home = (props) => {
  const dryFoodItem = props.products.filter(
    (product) => product.type === "thucphamkho"
  );

  const freshFoodItem = props.products.filter(
    (product) => product.type === "thucphamtuoi"
  );

  const drinksItem = props.products.filter(
    (product) => product.type === "thucuong"
  );

  return (
    <Container>
      <RenderMenuHeader title={"Thực phẩm khô"} path={"/sanpham/thucphamkho"} />
      <RenderHomeItem products={dryFoodItem} type={"thucphamkho"} />
      <RenderShowMore path={"/sanpham/thucphamkho"} />

      <RenderMenuHeader title={"Thực phẩm tươi"} path={"/sanpham/thucphamtuoi"} />
      <RenderHomeItem products={freshFoodItem} type={"thucphamtuoi"} />
      <RenderShowMore path={"/sanpham/thucphamtuoi"} />

      <RenderMenuHeader title={"Đồ uống"} path={"/sanpham/thucuong"} />
      <RenderHomeItem products={drinksItem} type={"thucuong"} />
      <RenderShowMore path={"/sanpham/thucuong"} />
    </Container>
  );
};

export default Home;
