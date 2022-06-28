import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Form,
  FormControl,
  Table,
  Image,
  Accordion,
} from "react-bootstrap";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import getFormatDate from "../../includes/getFormatDate";

const baseUrl = "/assets/";

const OrderHistory = (props) => {
  const [keyword, setKeyword] = useState("");

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [orderHistory, setOrderHistory] = useState([]);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  useEffect(() => {

    setOrderHistory(props.orders.orders);
  }, [props,orderHistory]);

  function validateForm() {
    // const required = (val) => val && val.length;
    const maxLength = (val, len) => !val || val.length <= len;
    const minLength = (val, len) => val && val.length >= len;
    const isNumber = (val) => !isNaN(Number(val));
    const validEmail = (val) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

    const { keyword } = form;
    const newErrors = {};
    alert(keyword);
    if (!keyword || keyword === "") {
      newErrors.keyword = "Xin nhập mã đơn hàng muốn tìm!";
    } else if (!minLength(keyword, 24)) {
      newErrors.keyword = "Xin nhập mã đơn hàng là 24 ký tự";
    } else if (!maxLength(keyword, 24)) {
      newErrors.keyword = "Xin nhập mã đơn hàng là 24 ký tự";
    }
    return newErrors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchInfo = {
      keyword: keyword,
    };

    // alert(JSON.stringify(form));
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      alert(JSON.stringify(errors));
    } else {
      // alert("Form submitted");
      props.fetchOrderHistoryWithOrderId(searchInfo.keyword);
    }
  };

  function RenderSearchResult(orders) {
    // alert(
    //   " orders history " +
    //     JSON.stringify(orders) +
    //     " lenght " +
    //     orders.length
    // );
    if (orders.length > 0) {
      return (
        <React.Fragment>
          <Accordion>
            {orders.map((item, key) => {
              // alert(JSON.stringify(item));
              return (
                <Accordion.Item key={key} eventKey={key}>
                  <Accordion.Header>{item._id}</Accordion.Header>
                  <Accordion.Body>
                    <Card.Title>---Thông Tin Đơn hàng---</Card.Title>
                    <Card.Text>
                      <b>Tình trạng: </b>{" "}
                      {item.approveStatus ? "Đã Xác Nhận" : "Chưa Xác Nhận"}
                    </Card.Text>
                    <Card.Text>
                      <b>Ngày tạo đơn: </b> {getFormatDate(item.date)}
                    </Card.Text>
                    <Card.Title>---Thông Tin Vận Chuyển---</Card.Title>
                    <Card.Text>
                      <b>Tên:</b> {item.deliveryInfo.name}
                    </Card.Text>
                    <Card.Text>
                      <b>Email:</b> {item.deliveryInfo.email}
                    </Card.Text>
                    <Card.Text>
                      <b>Điện thoại:</b> {item.deliveryInfo.phoneNumber}
                    </Card.Text>
                    <Card.Text>
                      <b>Địa chỉ:</b> {item.deliveryInfo.address}
                    </Card.Text>

                    <Card.Title>---Thông Tin Sản Phẩm---</Card.Title>
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
                        {item.products.map((p_item, key) => {
                          return (
                            <tr key={key}>
                              <td>{p_item.title}</td>
                              <td>
                                <Image
                                  src={"/assets/" + p_item.imageUrl}
                                  style={{ width: "100px", height: "80px" }}
                                />
                              </td>
                              <td>{p_item.price} ￥</td>
                              <td>{p_item.quantity}</td>
                              <td>
                                {Number(
                                  p_item.price * p_item.quantity
                                ).toLocaleString("en-US")}
                                ￥
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan="4">Tổng</td>
                          <td>{item.cashInfo.totalCash} ￥</td>
                        </tr>
                        <tr>
                          <td colSpan="4">Giảm giá</td>
                          <td>{item.cashInfo.coupon.discount * 100} %</td>
                        </tr>
                        <tr>
                          <td colSpan="4">Thành Tiền</td>
                          <td>
                            {item.cashInfo.totalCash -
                              item.cashInfo.coupon.discount *
                                item.cashInfo.totalCash}{" "}
                            ￥
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </React.Fragment>
      );
      // return(<h1>ok</h1>);
    } else {
      return <h1>Empty</h1>;
    }
  }

  if (!props.auth.auth.isLoggedIn && props.user.user.user === null) {
    return (
      <Container>
        <Row className="mt-3">
          {/* <Col xs={1} md={2} lg={3}></Col> */}
          <Col
            sm={{ span: 11, offset: 1 }}
            md={{ span: 10, offset: 1 }}
            lg={{ span: 7, offset: 2 }}
          >
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Form.Group as={Row} className="mb-3" controlId="keyword">
                <Col sm={9}>
                  <FormControl
                    className={!!errors.keyword && "red-border"}
                    onChange={(event) => {
                      setField("keyword", event.target.value);
                      setKeyword(event.target.value);
                    }}
                    name="keyword"
                    value={keyword}
                    placeholder="Nhập mã đơn hàng cần kiểm tra"
                    type="text"
                    // required
                    isInvalid={!!errors.keyword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.keyword}
                  </Form.Control.Feedback>
                </Col>

                <Col sm={3}>
                  <Button
                    variant="outline-success"
                    id="button-search"
                    type="submit"
                  >
                    Kiểm tra
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3"><Card.Title>---Kết Quả Tra Cứu Đơn Hàng---</Card.Title></Row>
        <Row className="mt-3">
          {/* <RenderSearchResult orders={orderHistory} /> */}
          {RenderSearchResult(orderHistory)}
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <Row>
          <Accordion>
            {orderHistory.map((item, key) => {
              // alert(JSON.stringify(item));
              return (
                <Accordion.Item key={key} eventKey={key}>
                  <Accordion.Header>{item._id}</Accordion.Header>
                  <Accordion.Body>
                    <Card.Title>---Thông Tin Đơn hàng---</Card.Title>
                    <Card.Text>
                      <b>Tình trạng: </b>{" "}
                      {item.approveStatus ? "Đã Xác Nhận" : "Chưa Xác Nhận"}
                    </Card.Text>
                    <Card.Text>
                      <b>Ngày tạo đơn: </b> {getFormatDate(item.date)}
                    </Card.Text>
                    <Card.Title>---Thông Tin Vận Chuyển---</Card.Title>
                    <Card.Text>
                      <b>Tên:</b> {item.deliveryInfo.name}
                    </Card.Text>
                    <Card.Text>
                      <b>Email:</b> {item.deliveryInfo.email}
                    </Card.Text>
                    <Card.Text>
                      <b>Điện thoại:</b> {item.deliveryInfo.phoneNumber}
                    </Card.Text>
                    <Card.Text>
                      <b>Địa chỉ:</b> {item.deliveryInfo.address}
                    </Card.Text>

                    <Card.Title>---Thông Tin Sản Phẩm---</Card.Title>
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
                        {item.products.map((p_item, key) => {
                          return (
                            <tr key={key}>
                              <td>{p_item.title}</td>
                              <td>
                                <Image
                                  src={"/assets/" + p_item.imageUrl}
                                  style={{ width: "100px", height: "80px" }}
                                />
                              </td>
                              <td>{p_item.price} ￥</td>
                              <td>{p_item.quantity}</td>
                              <td>
                                {Number(
                                  p_item.price * p_item.quantity
                                ).toLocaleString("en-US")}
                                ￥
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan="4">Tổng</td>
                          <td>{item.cashInfo.totalCash} ￥</td>
                        </tr>
                        <tr>
                          <td colSpan="4">Giảm giá</td>
                          <td>{item.cashInfo.coupon.discount * 100} %</td>
                        </tr>
                        <tr>
                          <td colSpan="4">Thành Tiền</td>
                          <td>
                            {item.cashInfo.totalCash -
                              item.cashInfo.coupon.discount *
                                item.cashInfo.totalCash}{" "}
                            ￥
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Row>
      </Container>
    );
  }
};

export default OrderHistory;
