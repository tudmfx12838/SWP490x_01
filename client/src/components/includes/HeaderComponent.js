import React, { Component } from "react";
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

  handleLogout(event) {
    // alert(JSON.stringify(this.props.user.user.user.email));
    // alert(JSON.stringify(this.props.auth.auth.sessionId));
    const sessionId = this.props.auth.auth.sessionId;
    //
    this.props.fetchUserLogout(sessionId);
    //
  }
  render() {
    //
    const currentPath = window.location.href;
    const getCurrentPath = currentPath.substring(22, currentPath.length);
    // alert("user: " + JSON.stringify(this.props.user.user.user) + " , auth " + this.props.auth.auth.isLogged);
    const LoginLogout_1 = () => {
      if (
        !this.props.auth.auth.isLoggedin &&
        this.props.user.user.user === null
      ) {
        return (
          <Nav.Link as={NavLink} to="/dangnhap" className="text-danger">
            Đặng Nhập
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
                this.handleLogout(event);
              }}
            >
              Đăng Xuất
            </Nav.Link>
            <Nav.Link as={NavLink} to="/thongtincanhan" className="text-danger">
              Người Dùng
            </Nav.Link>
          </React.Fragment>
        );
      }
    };

    const LoginLogout_2 = () => {
      if (!this.props.auth.auth.isLoggedin && this.props.user.user.user === null) {
        return (
          <Nav.Link as={NavLink} to="/dangnhap" className="d-lg-none">
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
                this.handleLogout(event);
              }}
            >
              Đăng Xuất
            </Nav.Link>
            <Nav.Link as={NavLink} to="/thongtincanhan" className="d-lg-none">
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
                    <RenderSearch />
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
                      {this.props.numberCart}
                    </Badge>
                  </Nav.Link>

                  {LoginLogout_1()}
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
                <Nav.Link as={NavLink} className="nav-link" to="/trangchu">
                  Trang Chủ
                </Nav.Link>
                <NavDropdown title="Sản phẩm" id="nav-dropdown">
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
                <Nav.Link
                  as={NavLink}
                  className="nav-link d-lg-none"
                  to="/giohang"
                >
                  Giỏ hàng<Badge bg="danger">{this.props.numberCart}</Badge>
                </Nav.Link>

                {LoginLogout_2()}
              </Nav>
              <div className="d-lg-none">
                <RenderSearch />
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
