import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Table,
  Image,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
  Col,
} from "react-bootstrap";

import { getAddressByZip } from "japan-address-autofill";

const Order = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const [addressFromPostCode, setAddressFromPostCode] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputNode, setInputNode] = useState("");

  function handlePostCodechange(e) {
    getAddressByZip(e.target.value).then((response) => {
      let address =
        response.prefecture + " " + response.city + " " + response.area + " ";
      setAddressFromPostCode(address);
    });
    setPostcode(e.target.value);
    // {"region":"中国","prefecture":"広島県","city":"広島市西区","area":"庚午中"}
    // alert(addressFromPostCode);
  }

  function handleOrder() {
    const orderInfo = {
        name: name,
        email: email,
        number: number,
        postcode: postcode,
        addressFromPostCode: addressFromPostCode,
        inputAddress: inputAddress,
        inputNode: inputNode,
    }
    alert(JSON.stringify(orderInfo));
  }

  const handleSubmit = event => {
      event.preventDefault();
      alert(name);
  }

  let ListCart = [];
  let TotalCart = 0;
  Object.keys(props.cart.Carts).forEach(function (item) {
    TotalCart += props.cart.Carts[item].quantity * props.cart.Carts[item].price;
    ListCart.push(props.cart.Carts[item]);
  });
  function TotalPrice(price, quantity) {
    return Number(price * quantity).toLocaleString("en-US");
  }

  let order = [];

  if (ListCart.length > 0) {
    return (
      <React.Fragment>
        <Container>
          <Row className="col-md-12">
            <h1 className="text-center">Thông Tin Giao Hàng</h1>
          </Row>

          <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Tên
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onBlur={(event) => {
                    setName(event.target.value);
                  }}
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onBlur={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Điện thoại
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onBlur={(event) => {
                    setNumber(event.target.value);
                  }}
                  type="number"
                  id="number"
                  name="number"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Mã bưu điện
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onBlur={(e) => {
                    handlePostCodechange(e);
                  }}
                  type="number"
                  id="postcode"
                  name="postcode"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Tỉnh/Thành
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onChange={(event) => {
                    setAddressFromPostCode(event.target.value);
                  }}
                  type="text"
                  id="address1"
                  name="address1"
                  defaultValue={addressFromPostCode}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Đường/Số nhà
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onBlur={(event) => {
                    setInputAddress(event.target.value);
                  }}
                  type="text"
                  id="address2"
                  name="address2"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label column sm={3}>
                Ghi chú
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  onBlur={(event) => {
                    setInputNode(event.target.value);
                  }}
                  as="textarea"
                  rows={3}
                />
              </Col>
            </Form.Group>

            <Table className="table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {ListCart.map((item, key) => {
                  let product = item._id;
                  let quantity = item.quantity;
                  order.push({
                    product: product,
                    quantity: quantity,
                    totalCash: TotalPrice(item.price, item.quantity),
                  });

                  return (
                    <tr key={key}>
                      <td>{item.title}</td>
                      <td>
                        <Image
                          src={"/assets/" + item.imageUrl}
                          style={{ width: "100px", height: "80px" }}
                        />
                      </td>
                      <td>{item.price} ￥</td>
                      <td>{item.quantity}</td>
                      <td>{TotalPrice(item.price, item.quantity)} ￥</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="5">Tổng</td>
                  <td>{Number(TotalCart).toLocaleString("en-US")} ￥</td>
                </tr>
              </tbody>
            </Table>

            <Button
              type="button"
              onClick={() => {
                handleOrder();
              }}
            >
              Đặt hàng
            </Button>
            <Button
              type="submit"
            >
              test submit
            </Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  } else {
    return (
      <Container>
        <Row>
          <h1>Không có đơn đặt hàng!</h1>
        </Row>
      </Container>
    );
  }
};

export default Order;
