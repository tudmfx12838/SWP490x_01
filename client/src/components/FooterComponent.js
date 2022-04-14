import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer(props){
    return(
        
        <div className="footer">
            <Container>
                <Row className="justify-content-md-center">
                    {/* <div className="justify-content-center">              */}
                        <Col>
                            <h5>Link</h5>
                            <ul className="list-unstyled">
                                {/* <li><Link to="/home" >Home</Link></li>
                                <li><Link to="/aboutus" >About Us</Link></li>
                                <li><Link to="/menu" >Menu</Link></li>
                                <li><Link to="/contactus" >Contact Us</Link></li> */}
                            </ul>
                        </Col>
                        <Col>
                            <h5>Liên Hệ</h5>
                            <address>
                            広島県広島市西区<br />
                            庚午中<br />
                            <i className="fa fa-phone fa-lg"></i>: +8190789<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:tudmfx12838@funix.edu.vn">
                            tudmfx12838@funix.edu.vn</a>
                            </address>
                        </Col>
                        <Col>
                            <div className="text-center">
                                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                                <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                            </div>
                        </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>             
                            <p>© Copyright 2018 Ristorante Con Fusion</p>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}


export default Footer;