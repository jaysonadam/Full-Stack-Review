import React from 'react';

import  { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../store/action/action";

function Navigation() {
  const dispatch = useDispatch();
  const { username, role, fullname } = useSelector((state) => state.student || state.teacher);

  const onLogoutClick = () => {
    dispatch(logoutAction())
  };

  if (username && role) {
  if (role === 'student') {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Container style={{ marginInline: '10px', maxWidth: '100%' }}>
            <Navbar.Brand href="/">SCHOOL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" bg="dark" variant="dark" className="justify-content-center">
              <Nav>
                <Nav.Link style={{ marginInline: '10px' }} href="/">Home</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/products">Products</Nav.Link>
              </Nav>
              <Nav className="ms-auto me-2">
                <NavDropdown style={{ marginRight: '30px' }} title={`Hello ${fullname}`}>
                  <NavDropdown.Item href="/edit">Edit Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={onLogoutClick}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else if (role === 'teacher') {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Container style={{ marginInline: '10px', maxWidth: '100%' }}>
            <Navbar.Brand href="/">SCHOOL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" bg="dark" variant="dark" className="justify-content-center">
              <Nav>
                <Nav.Link style={{ marginInline: '10px' }} href="/">Home</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/products">Products</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/add">Add Products</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/edit-products">Edit Products</Nav.Link>
              </Nav>
              <Nav className="ms-auto me-2">
                <NavDropdown style={{ marginRight: '30px' }} title={`Hello ${fullname}`}>
                  <NavDropdown.Item href="/edit">Edit Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={onLogoutClick}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
  )
  }} else {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Container style={{ marginInline: '10px', maxWidth: '100%' }}>
            <Navbar.Brand href="/">SCHOOL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" bg="dark" variant="dark" className="justify-content-center">
              <Nav>
                <NavDropdown title="Login">
                  <NavDropdown.Item href="/loginTeacher">As a Teacher</NavDropdown.Item>
                  <NavDropdown.Item href="/loginStudent">As a Student</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
}};

export default Navigation;