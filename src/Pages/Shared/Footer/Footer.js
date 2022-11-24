import React from 'react';
import './Footer.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../../assets/images/logo.png';
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer-container">
      <Container className="footer pt-5 pb-4">
        <Row>
          <Col xs={6} lg={2}>
            <div className="pb-3">
              <h4>Powered By</h4>
              <div>
                <img src={logo} width="60" height="60" alt="" />
                <h6 className=" fs-3 text-white mt-2">HomeTech</h6>
              </div>
              <div className="d-flex gap-3 pt-3" style={{ cursor: 'pointer' }}>
                <FaFacebookSquare size={28} />
                <FaInstagram size={28} />
                <FaLinkedin size={28} />
              </div>
            </div>
          </Col>
          <Col xs={6} lg={2}>
            <div className="pb-3">
              <h4>Support</h4>
              <div>
                <p>Support</p>
                <p>Help Center</p>
                <p>Find Store</p>
                <p>Flow Plans</p>
                <p>Site Map</p>
              </div>
            </div>
          </Col>

          <Col xs={6} lg={2}>
            <div className="pb-3">
              <h4>About Us</h4>
              <div>
                <p>EMI Terms</p>
                <p>Privacy Policy</p>
                <p>Refund Policy</p>
                <p>Blog</p>
                <p>Terms & Conditions</p>
              </div>
            </div>
          </Col>

          <Col xs={6} lg={2}>
            <div className="pb-3">
              <h4>My Account</h4>
              <div>
                <p>Profile</p>
                <p>Sells</p>
                <p>Account</p>
                <p>Purchase</p>
                <p>Preference</p>
              </div>
            </div>
          </Col>

          <Col xs={10} sm={8} md={6} lg={4}>
            <div className="pb-3">
              <h4>Stay Connected</h4>
              <div>
                <p>Sign up with your email to join our mailing list.</p>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="I would like to receive emails from HomeTech."
                    />
                  </Form.Group>

                  <Button
                    variant="info"
                    type="submit"
                    className="rounded-pill  fw-semibold btn-register text-white"
                  >
                    Subscribe
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>

        <div>
          <p className="text-center pt-4">
            Copyright &copy; 2022 Nurturing Minds. All rights reserved.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
