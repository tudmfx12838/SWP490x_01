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
import { Link, NavLink } from "react-router-dom";
import Event from "../EventComponent";

function RenderProductItem({ products, type, callback  }) {
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
                <Button variant="primary" onClick={() => callback(p)}>Thêm</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

const ProductDry = ({ products, AddCart }) => {
  const productTypes = products.filter((product) => product.type === "thucphamkho");
  return (
    <Container>

      <Row>
        <Breadcrumb>
          {/* <Breadcrumb.Item> <Link to='/'>Trang chủ</Link></Breadcrumb.Item> */}
          <NavLink to="/">Trang chủ </NavLink>
          <Breadcrumb.Item active>/ Thực phẩm khô</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <RenderProductItem products={productTypes} type={"thucphamkho"} callback={AddCart}/>
    </Container>
  );
};

export default ProductDry;
