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
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Cart = (props) => {
  //  console.log(items)
  const [show, setShow] = useState(false);
  const [storeKey, setStoreKey] = useState(null);

  /**
   * The method handleClose() implement closing confirm delete a product in cart
   */
  const handleClose = () => {
    //hide confirm modal
    setShow(false);

    //store product's info by null(nothing to delete)
    setStoreKey(null);
  };

  /**
   * The method handleShow() implement showing confirm before delete a product in cart
   */
  const handleShow = (key) => {
    //show confirm modal
    setShow(true);

    //store product's info that want to delete
    setStoreKey(key);
  };

  /**
   * The method handleDelete() implement delete a product in cart
   */
  const handleDelete = () => {
    //hide confirm modal
    setShow(false);

    /**
     * The method DeleteCart() implement delete a product by stored product's info in cart
     */
    props.DeleteCart(storeKey);

    //store product's info by null(nothing to delete) atfer delete a product
    setStoreKey(null);
  };

  let ListCart = [];
  let TotalCart = 0;

  //Create a List cart for showing
  Object.keys(props.cart.Carts).forEach(function (item) {
    TotalCart += props.cart.Carts[item].quantity * props.cart.Carts[item].price;
    ListCart.push(props.cart.Carts[item]);
  });

  /**
   * The method TotalPrice() caculate total of price 
   * @param price is product's price
   * @param quantity is number of product in cart
   */
  function TotalPrice(price, quantity) {
    return Number(price * quantity).toLocaleString("en-US");
  }

  //Show cart if it's not null and show inform as empty if nothing in cart
  if (ListCart.length > 0) {
    return (
      <Container>
        <Row className="col-md-12">
          <Table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {ListCart.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <Button variant="danger" onClick={() => handleShow(key)}>
                        X
                      </Button>
                    </td>
                    <td>{item.title}</td>
                    <td>
                      <Image
                        src={"/assets/" + item.imageUrl}
                        style={{ width: "100px", height: "80px" }}
                      />
                    </td>
                    <td>{item.price} ￥</td>
                    <td>
                      <Button
                        variant="primary"
                        style={{ margin: "2px" }}
                        onClick={() => props.DecreaseQuantity(key)}
                      >
                        -
                      </Button>
                      <span className="btn btn-outline-info">
                        {item.quantity}
                      </span>
                      <Button
                        variant="primary"
                        style={{ margin: "2px" }}
                        onClick={() => props.IncreaseQuantity(key)}
                      >
                        +
                      </Button>
                    </td>
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
        </Row>
        <Row>
          <Link as={NavLink} className="btn btn-primary" to="/dathang">
            Xác nhận đơn hàng
          </Link>
        </Row>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận tác vụ xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleDelete}>
              Có
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Không
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <h1>Giỏ hàng trống!</h1>
        </Row>
      </Container>
    );
  }
};

export default Cart;
