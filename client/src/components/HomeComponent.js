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


function RenderHomeItem({ products, type, callback }) {
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
                <Button variant="primary" onClick={() => callback(p)}>Thêm</Button>
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

  const [quantity, setQuantity] = useState(0);

  const dryFoodItem = props.products.filter(
    (product) => product.type === "thucphamkho"
  );

  const freshFoodItem = props.products.filter(
    (product) => product.type === "thucphamtuoi"
  );

  const drinksItem = props.products.filter(
    (product) => product.type === "thucuong"
  );

  // function HandleAddCart(product){
  //   props.AddCart(product);
  // }

  return (
    <Container>
      <Event />
      <RenderMenuHeader title={"Thực phẩm khô"} path={"/sanpham/thucphamkho"} />
      <RenderHomeItem products={dryFoodItem} type={"thucphamkho"} callback={props.AddCart}/>
      <RenderShowMore path={"/sanpham/thucphamkho"} />

      <RenderMenuHeader title={"Thực phẩm tươi"} path={"/sanpham/thucphamtuoi"} />
      <RenderHomeItem products={freshFoodItem} type={"thucphamtuoi"} callback={props.AddCart}/>
      <RenderShowMore path={"/sanpham/thucphamtuoi"} />

      <RenderMenuHeader title={"Đồ uống"} path={"/sanpham/thucuong"} />
      <RenderHomeItem products={drinksItem} type={"thucuong"} callback={props.AddCart}/>
      <RenderShowMore path={"/sanpham/thucuong"} />
    </Container>
  );
};

export default Home;
