import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase.jsx";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const firebase = useFirebase();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand href="/" className="fw-bold fs-4">
          Bookify
        </Navbar.Brand>

        {/* Hamburger Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" active={location.pathname === "/"}>
              Home
            </Nav.Link>

            {firebase.isLoggedIn && (
              <>
                <Nav.Link
                  href="/books/list"
                  active={location.pathname === "/books/list"}
                >
                  Add Listing
                </Nav.Link>

                <Nav.Link
                  href="/books/orders"
                  active={location.pathname.startsWith("/books/orders")}
                >
                  Orders
                </Nav.Link>

                <NavDropdown title="Account" id="nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {!firebase.isLoggedIn && (
              <>
                <Nav.Link
                  href="/login"
                  active={location.pathname === "/login"}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  href="/register"
                  active={location.pathname === "/register"}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
