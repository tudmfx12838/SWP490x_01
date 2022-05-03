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
  Image
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// import { NavLink } from 'react-router-dom';

function RenderSearch() {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Nhập sản phẩm muốn tìm"
        // aria-label="Recipient's username"
        // aria-describedby="basic-addon2"
      />
      <Button variant="outline-secondary" id="button-addon2">
        Tìm Kiếm
      </Button>
    </InputGroup>
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

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <Image
                src={"/assets/images/nuocmam.jpg"}
                style={{ width: "100px", height: "80px" }}
              />
            </Col>
            <Col>
              <RenderSearch />
            </Col>
          </Row>
        </Container>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Thực phẩm Việt-Nhật</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} className="nav-link" to="/trangchu">
                Trang Chủ
              </Nav.Link>
              <NavDropdown title="Sản phẩm" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/sanpham/thucphamkho">Thực phẩm khô</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/sanpham/thucphamtuoi">Thực phẩm tươi</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/sanpham/thucphamdonggoi">Thực phẩm đóng gói</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/sanpham/giavi">Gia vị</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/sanpham/thucuong">Đồ uống</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link as={NavLink} className="nav-link" to="/giohang">
                Giỏ hàng<Badge bg="success">{this.props.numberCart}</Badge>
              </Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/quanly">
                Quản lý
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Đăng Ký</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Đặng Nhập
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </React.Fragment>
    );
  }
}

export default Header;
