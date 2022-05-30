import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Badge,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// import { NavLink } from 'react-router-dom';

function RenderSearch() {
  return (
    <Form className="d-flex">
      <FormControl
        placeholder="Nhập sản phẩm muốn tìm"
        type="search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success" id="button-addon2">
        Tìm
      </Button>
    </Form>
  );
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
  }
  // #F80346
  render() {
    return (
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
                  <RenderSearch />
                </Col>
                <Col className="col-2"></Col>
              </Row>
            </Col>
            <Col className="col-12 col-md-3">
              <Nav>
                <Nav.Link href="/login" className="text-danger">
                  Đặng Nhập
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  className="nav-link text-danger"
                  to="/giohang"
                >
                  Giỏ hàng<Badge bg="success">{this.props.numberCart}</Badge>
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
        </Container>

        <Navbar
          // sticky="top"
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="navbar-custom"
        >
          <Navbar.Brand as={NavLink}  className="d-none d-lg-block" to="/trangchu">
            Thực phẩm Việt
          </Navbar.Brand>
          <Navbar.Brand as={NavLink} className="d-lg-none rounded" to="/trangchu">
            <Image
              src={"/assets/images/logoVietFood.png"}
              style={{ width: "40px", height: "30px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} className="nav-link" to="/trangchu">
                Trang Chủ
              </Nav.Link>
              <NavDropdown title="Sản phẩm" id="nav-dropdown" >
                <NavDropdown.Item>
                  <Link to="/sanpham/thucphamkho">Thực phẩm khô</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/sanpham/thucphamtuoi">Thực phẩm tươi</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/sanpham/thucuong">Thức uống</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={NavLink} className="nav-link" to="/lichsu">
                Lịch Sử
              </Nav.Link>
              <Nav.Link href="/login" className="d-lg-none">
                Đặng Nhập
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                className="nav-link d-lg-none"
                to="/giohang"
              >
                Giỏ hàng<Badge bg="success">{this.props.numberCart}</Badge>
              </Nav.Link>
            </Nav>
            <div className="d-lg-none">
              <RenderSearch />
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
