import React, { Component, useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Image,
  Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function RenderProduct({ product, callback }) {
  return (
    // <Card style={{ height: "18rem" }} className="mb-3">
    //   <Card.Img
    //     variant="top"
    //     src={"/assets/" + product.imageUrl}
    //     alt={product.title}
    //     width={100}
    //     height={100}
    //   />
    //   <Card.Body>
    //     <Card.Title>{product.title}</Card.Title>
    //     {/* <Card.Text>{product.description}</Card.Text> */}
    //   </Card.Body>
    //   <Card.Footer>
    //     <Button variant="primary" onClick={() => callback(product)}>Thêm</Button>
    //   </Card.Footer>
    // </Card>
  
      <Row>
        <Col>
          <Image
            variant=""
            src={"/assets/" + product.imageUrl}
            alt={product.title}
            width={150}
            height={200}
          />
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" onClick={() => callback(product)}>
                Thêm
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
  );
}

const ProductDetail = (props) => {
  var typeFoodTitle, pathTypeFood;

  if (props.product.type === "thucphamkho") {
    typeFoodTitle = "Thực phẩm khô";
    pathTypeFood = "/sanpham/thucphamkho";
  } else if (props.product.type === "thucphamtuoi") {
    typeFoodTitle = "Thực phẩm tươi";
    pathTypeFood = "/sanpham/thucphamtuoi";
  } else if (props.product.type === "thucuong") {
    typeFoodTitle = "Thức uống";
    pathTypeFood = "/sanpham/thucuong";
  }

  // function HandleAddCart(product){
  //   alert(product.title);
  //   props.AddCart(product);
  // }

  return (
    <Container>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>
            {" "}
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={pathTypeFood}>{typeFoodTitle}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{props.product.title}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <RenderProduct product={props.product} callback={props.AddCart} />
      </Row>
    </Container>
  );
};

export default ProductDetail;
