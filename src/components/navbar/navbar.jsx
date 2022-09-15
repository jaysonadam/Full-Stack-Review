import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../store/action/action";
import { Navigate } from "react-router-dom";

function Navigation() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => {
    return state.auth;
  });
  const [logout, setLogout] = useState(false);

  const onLogoutClick = () => {
    dispatch(logoutAction())
    setLogout(true);
  };

  if (logout === true) {
    return <Navigate to="/" replace />
  } 

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container style={{ marginInline: '10px', maxWidth: '100%' }}>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" bg="dark" variant="dark" className="justify-content-center">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Products</Nav.Link>
            <Nav.Link href="/">Contact Us</Nav.Link>
          </Nav>
          {username ? (
            <>
              <Nav className="ms-auto">
                <Nav.Link>Hello {username}</Nav.Link>
                <Nav.Link href="/" onClick={onLogoutClick}>Logout</Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ms-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/reg">Register</Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;