import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Badge,
  Carousel,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Image
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function RenderCarousel() {
  return (
    <Carousel variant="dark" style={{ width: "100%", height: "300px" }}>
      <Carousel.Item>
        <img
          style={{ width: "100%", height: "300px" }}
          className="d-block w-100"
          src="/assets/images/doan1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ width: "100%", height: "300px" }}
          className="d-block w-100"
          src="/assets/images/doan2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ width: "100%", height: "300px" }}
          className="d-block w-100"
          src="/assets/images/doan3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

class Event extends Component {
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
          <RenderCarousel />
        </Container>
      </React.Fragment>
    );
  }
}

export default Event;
