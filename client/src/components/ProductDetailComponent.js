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

function RenderProduct({ product }) {
  return (
    <Card style={{ height: "18rem" }} className="mb-3">
      <Card.Img
        variant="top"
        src={"/assets/" + product.imageUrl}
        alt={product.title}
        width={100}
        height={100}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        {/* <Card.Text>{product.description}</Card.Text> */}
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Thêm</Button>
      </Card.Footer>
    </Card>
  );
}

const ProductDetail = ({ product }) => {

var typeFoodTitle, pathTypeFood;

if(product.type === 'thucphamkho'){
    typeFoodTitle = 'Thực phẩm khô';
    pathTypeFood = '/sanpham/thucphamkho';
}else if(product.type === 'thucphamtuoi'){
    typeFoodTitle = 'Thực phẩm tươi';
    pathTypeFood = '/sanpham/thucphamtuoi';
}else if(product.type === 'thucuong'){
    typeFoodTitle = 'Thức uống';
    pathTypeFood = '/sanpham/thucuong';
}

  return (
    <Container>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item> <Link to='/'>Trang chủ</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={pathTypeFood}>{typeFoodTitle}</Link></Breadcrumb.Item>
          <Breadcrumb.Item active>{product.title}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <RenderProduct product={product} />
      </Row>
    </Container>
  );
};

export default ProductDetail;
