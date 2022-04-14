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
              <Nav.Link as={NavLink} className="nav-link" to="/">Trang Chủ</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/sanpham">Sản Phẩm</Nav.Link>
              <Nav.Link as={NavLink} className="nav-link" to="/quanly">Quản lý</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                More deets
              </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
              <Nav.Link href="#deets2">
                More deets2
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;
