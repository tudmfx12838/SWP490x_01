import React, { Component, useState, useEffect, useRef } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Badge,
  Container,
  Row,
  Col,
  Modal,
  FormControl,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = (props) => {
  let navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState("");

  function handleLogout(event) {
    // alert(JSON.stringify(this.props.user.user.user.email));
    // alert(JSON.stringify(this.props.auth.auth.sessionId));
    const sessionId = props.auth.auth.sessionId;
    //
    props.fetchUserLogout(sessionId);
    //
  }

  function handleSubmitSearch() {
    const products = props.products;
    if (keyword !== "") {
      
      const keywordUppercase = keyword.toUpperCase();
      const result = products.filter((product) => {
        const titleUppercase = product.title.toUpperCase();
        if (titleUppercase.includes(keywordUppercase)) {
          return true;
        } else {
          return false;
        }
      });

      // alert(JSON.stringify(result));
      navigate(`/timkiem/ketquatimkiem?tukhoa=${keyword}`);
    }
  }

  //
  const currentPath = window.location.href;
  const getCurrentPath = currentPath.substring(22, currentPath.length);
  // alert("user: " + JSON.stringify(this.props.user.user.user) + " , auth " + this.props.auth.auth.isLogged);
  const LoginLogout_1 = () => {
    if (!props.auth.auth.isLoggedIn && props.user.user.user === null) {
      return (
        <Nav.Link as={NavLink} to="/dangnhap" className="text-danger">
          Đăng Nhập
        </Nav.Link>
      );
    } else {
      return (
        <React.Fragment>
          <Nav.Link
            as={NavLink}
            to={getCurrentPath}
            className="text-danger"
            onClick={(event) => {
              handleLogout(event);
            }}
          >
            Đăng Xuất
          </Nav.Link>
          <Nav.Link as={NavLink} to="/nguoidung" className="text-danger">
            Người Dùng
          </Nav.Link>
        </React.Fragment>
      );
    }
  };

  const LoginLogout_2 = () => {
    if (!props.auth.auth.isLoggedin && props.user.user.user === null) {
      return (
        <Nav.Link
          as={NavLink}
          to="/dangnhap"
          className="d-lg-none"
          eventKey="5"
        >
          Đăng Nhập
        </Nav.Link>
      );
    } else {
      return (
        <React.Fragment>
          <Nav.Link
            as={NavLink}
            to={getCurrentPath}
            className="d-lg-none"
            onClick={(event) => {
              handleLogout(event);
            }}
            eventKey="6"
          >
            Đăng Xuất
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/nguoidung"
            className="d-lg-none"
            onSelect={() => {}}
            eventKey="7"
          >
            Người Dùng
          </Nav.Link>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="sticky-top">
        <Container className="d-none d-lg-block bg-white">
          <Row>
            <Col className="col-12 col-md-1">
              <Link to="/trangchu">
                <Image
                  src={"/assets/images/logoVietFood.png"}
                  style={{ width: "100px", height: "80px" }}
                />
              </Link>
            </Col>
            <Col className="col-12 col-md-8">
              <Row>
                <Col className="col-2"></Col>
                <Col className="col-8 mt-4">
                  <div className="search-dropdow">
                    <Form className="d-flex">
                      <Form.Control
                        placeholder="Nhập sản phẩm muốn tìm"
                        className="me-2"
                        aria-label="Search"
                        name="keyword"
                        type="text"
                        value={keyword}
                        onChange={(event) => {
                          setKeyword(event.target.value);
                        }}
                      />
                      <Button
                        variant="outline-success"
                        id="button-addon2"
                        onClick={handleSubmitSearch}
                      >
                        Tìm
                      </Button>
                    </Form>
                  </div>
                </Col>
                <Col className="col-2"></Col>
              </Row>
            </Col>
            <Col className="col-12 col-md-3">
              <Nav>
                <Nav.Link
                  as={NavLink}
                  className="nav-link text-danger"
                  to="/giohang"
                >
                  Giỏ hàng
                  <Badge className="white" bg="light">
                    {props.numberCart}
                  </Badge>
                </Nav.Link>

                {LoginLogout_1()}
              </Nav>
            </Col>
          </Row>
        </Container>

        <Navbar
          // sticky="top
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="navbar-custom"
        >
          <Navbar.Brand
            as={NavLink}
            className="d-none d-lg-block"
            to="/trangchu"
          >
            Thực phẩm Việt
          </Navbar.Brand>
          <Navbar.Brand
            as={NavLink}
            className="d-lg-none rounded"
            to="/trangchu"
          >
            <Image
              src={"/assets/images/logoVietFood.png"}
              style={{ width: "40px", height: "30px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                as={NavLink}
                className="nav-link"
                to="/trangchu"
                eventKey="1"
              >
                Trang Chủ
              </Nav.Link>
              <NavDropdown title="Sản phẩm" id="nav-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  to="/sanpham/thucphamkho"
                  eventKey="2.1"
                >
                  {" "}
                  Thực phẩm khô
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/sanpham/thucphamtuoi"
                  eventKey="2.2"
                >
                  {" "}
                  Thực phẩm tươi
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/sanpham/thucuong"
                  eventKey="2.3"
                >
                  Thức uống
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as={NavLink}
                className="nav-link"
                to="/lichsu"
                eventKey="3"
              >
                Lịch Sử
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                className="nav-link d-lg-none"
                to="/giohang"
                eventKey="4"
              >
                Giỏ hàng<Badge bg="danger">{props.numberCart}</Badge>
              </Nav.Link>

              {LoginLogout_2()}
            </Nav>
            <div className="d-lg-none">
              {/* <Form
                className="d-flex"
                onSubmit={(event) => handleSubmit(event)}
              >
                <FormControl
                  placeholder="Nhập sản phẩm muốn tìm"
                  className="me-2"
                  aria-label="Search"
                  name="keyword"
                  type="text"
                  value={keyword}
                  onChange={(event) => {
                    handleInputing(event.target.value);
                  }}
                />
                <Button variant="outline-success" id="button-addon2">
                  Tìm
                </Button>
              </Form> */}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </React.Fragment>
  );
};

export default Header;
