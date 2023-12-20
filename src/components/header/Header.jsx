import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar
      bg="primary"
      data-bs-theme="dark"
      expand="lg"
      className="fs-2 bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand className="fs-2" href="#home">Insurances</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100">
            <div className="d-flex justify-content-between w-100">
              <div className="w-75 d-flex justify-content-around">
                <Nav.Link className="fs-2" href="/userInsurances">My insurances</Nav.Link>
                <Nav.Link className="fs-2" href="profile">My profile</Nav.Link>
                <Nav.Link className="fs-2" href="insurances">Insurances</Nav.Link>
              </div>
              <div className="">
                <Nav.Link className="fs-2" href="#link">Log out</Nav.Link>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
