import React, { Component } from "react";
import {
  Container,
  Row,
  Table,
  Image,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const Cart = (props) => {
  //  console.log(items)
  let ListCart = [];
  let TotalCart = 0;
  Object.keys(props.cart.Carts).forEach(function (item) {
    TotalCart += props.cart.Carts[item].quantity * props.cart.Carts[item].price;
    ListCart.push(props.cart.Carts[item]);
  });
  function TotalPrice(price, quantity) {
    return Number(price * quantity).toLocaleString("en-US");
  }

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
                      <Button
                        variant="danger"
                        onClick={() => props.DeleteCart(key)}
                      >
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
      </Container>
    );
  }else{
      return(
          <Container>
              <Row>
                  <h1>Giỏ hàng trống!</h1>
              </Row>
          </Container>
      )
  }
};

export default Cart;
