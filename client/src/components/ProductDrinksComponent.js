import React, { Component, useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function RenderProductItem({ products, type }) {
  return (
    <>
      <Row xs={2} md={3} lg={5} className="g-4">
        {Array.from(products).map((p, idx) => (
          <Col key={p._id}>
            <Card style={{}} className="mb-3">
              <Link to={`/sanpham/${type}/${p._id}`}>
                <Card.Img
                  variant="top"
                  src={"/assets/" + p.imageUrl}
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

const ProductDrinks = ({ products }) => {
  const productTypes = products.filter((product) => product.type === "thucuong");
  return (
    <Container>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item> <Link to='/'>Trang chủ</Link></Breadcrumb.Item>
          <Breadcrumb.Item active>Thức uống</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <RenderProductItem products={productTypes} type={"thucuong"}/>
    </Container>
  );
};

export default ProductDrinks;
