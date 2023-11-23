import React, { useState } from 'react';
import { Nav, Navbar, Modal, Button, Form } from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleHideRegisterModal = () => setShowRegisterModal(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleHideLoginModal = () => setShowLoginModal(false);

  const handleRegister = () => {
    // Add your registration logic here
    // Close the modal after registration
    handleHideRegisterModal();
  };

  const handleLogin = () => {
    // Add your login logic here
    // Close the modal after login
    handleHideLoginModal();
  };

  return (
    <div className='row' style={{ marginBottom: "100px" }}>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand style={{ marginLeft: "20px" }}>
          <img src="logo.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown"/>
        
        <Navbar.Collapse id="navbarNavDropdown" className="justify-content-end">
          <Nav className="ml-auto">
            <li>
              <Button variant="link" onClick={handleShowLoginModal} style={buttonStyle}>
                Login
              </Button>
            </li>
            <li>
              <Button variant="link" onClick={handleShowRegisterModal} style={buttonStyle}>
                Register
              </Button>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AuthModal
        title="Register"
        show={showRegisterModal}
        onHide={handleHideRegisterModal}
        onSubmit={handleRegister}
      />

      <AuthModal
        title="Login"
        show={showLoginModal}
        onHide={handleHideLoginModal}
        onSubmit={handleLogin}
      />
    </div>
  );
};

const AuthModal = ({ title, show, onHide, onSubmit }) => {
  return (
    <Modal centered show={show} onHide={onHide} style={modalStyle}>
      <Modal.Header closeButton style={modalHeaderStyle}>
        <Modal.Title className="d-flex justify-content-center w-100" style={modalTitleStyle}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center' style={modalBodyStyle}>
        <Form style={formStyle}>
          <Form.Group controlId="formBasicEmail" className="mb-5">
            <Form.Control type="email" placeholder="Email" style={inputStyle} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mb-5">
            <Form.Control type="password" placeholder="Password" style={inputStyle} />
          </Form.Group>
          {title === "Register" && (
            <Form.Group controlId="formBasicPassword" className="mb-5">
              <Form.Control type="password" placeholder="Confirm Password" style={inputStyle} />
            </Form.Group>
          )}
          <Button style={submitButtonStyle} variant="primary" onClick={onSubmit}>
            {title === "Login" ? "Login" : "Create account"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const modalStyle = { backgroundColor: 'rgba(226, 243, 255, 0.5)', color: 'rgba(4, 57,94,1)' };
const modalHeaderStyle = { backgroundColor: "rgba(4, 57, 94, 1)", border: 'none' };
const modalTitleStyle = { color: "white" };
const closeButtonStyle = { backgroundColor: 'white', color: 'rgba(4, 57, 94, 1)', border: 'none', fontSize: '30px', padding: '1px', paddingTop:'0.8px', paddingBottom:'0px'};
const modalBodyStyle = { backgroundColor: "rgba(4, 57, 94, 1)" };
const formStyle = { backgroundColor: "rgba(4, 57, 94, 1)" };
const inputStyle = { backgroundColor: 'rgba(4, 57, 94, 1)', border: "2px solid white", color: 'white' };
const submitButtonStyle = { alignSelf: "center", backgroundColor: 'white', color: 'rgba(4, 57, 94, 1)', border: '2px solid white' };
const buttonStyle = { color: "rgba(4, 57, 94, 1)", textDecoration: "none", fontWeight: "600" };

export default NavBar;