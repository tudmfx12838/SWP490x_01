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

function RenderProductItem({ products, type, callback }) {
  var md = 3;
  var lg = 5;
  if(products.length < 5 && products.length >= 3){
    md = 3;
    lg = 4;
  }else if(products.length < 3){
    md = 2;
    lg = 2;
  }

  return (
    <div className="product-container">
      <div className="product-content">
        <Row xs={2} md={md} lg={lg} className="g-4">
          {Array.from(products).map((p, idx) => (
            <Col key={p._id}>
              <Card style={{}} className="mb-3 product-card">
                <Link to={`/sanpham/${type}/${p._id}`}>
                  <Card.Img
                    className="product-img"
                    variant="top"
                    src={"/assets/" + p.imageUrl}
                    alt={p.title}
                    width={100}
                    height={150}
                  />
                  <Card.Body>
                    <Card.Title className="product-name">{p.title}</Card.Title>
                  </Card.Body>
                </Link>
                <Card.Text className="product-cost">Giá: {p.price}</Card.Text>
                <Card.Text className="product-cost">
                  {p.available === false
                    ? "(Ngừng bán)"
                    : p.mount > 0
                    ? "(Còn hàng)"
                    : "(Hết hàng)"}
                </Card.Text>
                <Button
                  variant="secondary"
                  className="product-add-button"
                  onClick={() => callback(p)}
                  // disabled={p.mount <= 0 ? true : false}
                  disabled={p.mount > 0 && p.available ? false : true}
                >
                  {/* {p.mount <= 0 ? "Hết hàng" : "Thêm"} */}
                  {p.available === false
                    ? "Ngừng bán"
                    : p.mount <= 0
                    ? "Hết hàng"
                    : "Thêm"}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

const ProductDry = ({ products, AddCart }) => {
  const productTypes = products.filter(
    (product) => product.type === "thucphamkho"
  );
  return (
    <Container>
      <Row>
        <Breadcrumb>
          {/* <Breadcrumb.Item> <Link to='/'>Trang chủ</Link></Breadcrumb.Item> */}
          <NavLink to="/">Trang chủ </NavLink>
          <Breadcrumb.Item active>/ Thực phẩm khô</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <RenderProductItem
        products={productTypes}
        type={"thucphamkho"}
        callback={AddCart}
      />
    </Container>
  );
};

export default ProductDry;
