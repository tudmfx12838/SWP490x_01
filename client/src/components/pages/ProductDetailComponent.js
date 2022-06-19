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

    <Container>
      <Row xs={1} md={2}>
        <Col>
          <Image
            variant=""
            src={"/assets/" + product.imageUrl}
            alt={product.title}
            width={300}
            height={400}
          />
        </Col>
        <Col>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Giá: {product.price}</Card.Text>
          <Card.Text>Số Lượng: {product.mount}</Card.Text>
          <Card.Text>
            Tình trạng: {product.mount > 0 ? "Còn hàng" : "Hết hàng"}
          </Card.Text>
          <Button
            variant="primary"
            onClick={() => callback(product)}
            disabled={product.mount <= 0 ? true : false}
          >
            {product.mount <= 0 ? "Hết hàng" : "Thêm"}
          </Button>
        </Col>
      </Row>
    </Container>
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
