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
    handleHideRegisterModal();
  };

  const handleLogin = () => {
    handleHideLoginModal();
  };

  return (
    <div className='row' style={{ marginBottom: '100px' }}>
      <Navbar bg='light' expand='lg' fixed='top'>
        <Navbar.Brand style={{ marginLeft: "20px" }}>
          <img src='logo.png' alt='' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarNavDropdown'/>
        
        <Navbar.Collapse id='navbarNavDropdown' className='justify-content-end'>
          <Nav className='ml-auto'>
            <li>
              <Button variant='link' onClick={handleShowLoginModal}>
                Login
              </Button>
            </li>
            <li>
              <Button variant='link' onClick={handleShowRegisterModal}>
                Register
              </Button>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AuthModal
        title='Register'
        show={showRegisterModal}
        onHide={handleHideRegisterModal}
        onSubmit={handleRegister}
      />

      <AuthModal
        title='Login'
        show={showLoginModal}
        onHide={handleHideLoginModal}
        onSubmit={handleLogin}
      />
    </div>
  );
};

const AuthModal = ({ title, show, onHide, onSubmit }) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className='d-flex justify-content-center w-100'>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <Form>
          <Form.Group controlId='formBasicEmail' className='mb-5'>
            <Form.Control type='email' placeholder='Email' />
          </Form.Group>
          <Form.Group controlId='formBasicPassword' className='mb-5'>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          {title === 'Register' && (
            <Form.Group controlId='formBasicPassword' className='mb-5'>
              <Form.Control type='password' placeholder='Confirm Password' />
            </Form.Group>
          )}
          <Button className='btn-submit' onClick={onSubmit}>
            {title === 'Login' ? 'Login' : 'Create account'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NavBar;