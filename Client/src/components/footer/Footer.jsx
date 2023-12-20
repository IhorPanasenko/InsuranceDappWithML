import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container className="d-flex p-2 m-3">
        <Row>
          <Col md={6}>
            <h2>Decentralized Insurance</h2>
          </Col>
          <Col className="fs-3" md={200}>
            <div className="mt-5 d-flex justify-content-around">
              <div className="">
                <h2>Contact Us</h2>
                123 Main Street
                <br />
                Kharkiv, Ukraine
                <br />
              </div>
              <div className="">
                <h2> our emails:</h2>
                <p>
                  mariia.liashenko@nure.ua
                  <br />
                  ihor.panasenko1@nure.ua
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        <p className="fs-3">
          &copy; {new Date().getFullYear()} Decentralized Insurance App. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
