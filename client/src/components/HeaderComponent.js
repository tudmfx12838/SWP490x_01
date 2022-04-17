import React, { Component } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

// import { NavLink } from 'react-router-dom';

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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Thực phẩm Việt-Nhật</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} className="nav-link" to="/trangchu">Trang Chủ</Nav.Link>
              <NavDropdown title="Sản phẩm" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to ="/sanpham/thucphamkho">Thực phẩm khô</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to ="/sanpham/thucphamtuoi">Thực phẩm tươi</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to ="/sanpham/thucphamdonggoi">Thực phẩm đóng gói</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to ="/sanpham/giavi">Gia vị</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to ="/sanpham/thucuong">Đồ uống</Link></NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link as={NavLink} className="nav-link" to="/giohang">Giỏ hàng</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/quanly">Quản lý</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                Đăng Ký
              </Nav.Link>
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
