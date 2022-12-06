import React from 'react';

import  { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../store/action/action";

function Navigation() {
  const dispatch = useDispatch();
  const { username, role, fullname } = useSelector((state) => state.auth);

  const onLogoutClick = () => {
    dispatch(logoutAction())
  };

  if (username && role) {
  if (role === 'student') {
    return (
      <>
        <Navbar bg="success" variant="dark" expand="lg">
          <Container style={{ marginInline: '10px', maxWidth: '100%' }}>
            <Navbar.Brand href="/">SCHOOL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" bg="dark" variant="dark" className="justify-content-center">
              <Nav>
                <Nav.Link style={{ marginInline: '10px' }} href="/home-student">Home</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/homework">Homework</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/exams">Exam</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/attendance">Attendance</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/events">Events</Nav.Link>
              </Nav>
              <Nav className="ms-auto me-2">
                <NavDropdown style={{ marginRight: '30px' }} title={`Signed in as: ${fullname}`}>
                  <NavDropdown.Item href="/profile">Student Profile</NavDropdown.Item>
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
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container style={{ marginInline: '10px', maxWidth: '100%' }}>
            <Navbar.Brand href="/">SCHOOL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" bg="dark" variant="dark" className="justify-content-center">
              <Nav>
                <Nav.Link style={{ marginInline: '10px' }} href="/home-teacher">Home</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/exam-teacher">Exam</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/attendance">Attendance</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/events">Events</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/subjects">Subjects</Nav.Link>
                <NavDropdown style={{ marginRight: '30px' }} title="Homework">
                  <NavDropdown.Item href="/homework">List & add new</NavDropdown.Item>
                  <NavDropdown.Item href="/submit-hw">Submitted</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className="ms-auto me-2">
                <NavDropdown style={{ marginRight: '30px' }} title={`Signed in as: ${fullname}`}>
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
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container style={{ marginInline: '10px', maxWidth: '100%' }}>
            <Navbar.Brand href="/">SCHOOL</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" bg="dark" variant="dark">
              <Nav>
                <Nav.Link style={{ marginInline: '10px' }} href="/about">About</Nav.Link>
                <Nav.Link style={{ marginInline: '10px' }} href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    )
}};

export default Navigation;