import React, { useState } from 'react';
import { Nav, Navbar, Modal, Button, Form } from 'react-bootstrap';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const NavBar = () => {
  const history = useNavigate();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setCPassword] = useState('')

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleHideRegisterModal = () => setShowRegisterModal(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleHideLoginModal = () => setShowLoginModal(false);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/", {
        email, password, confirmPassword
      })
        .then(res => {
          if (res.data === "exist") {
            alert("User already exists")
          } else if (res.data === "notexist") {
            history("/", { state: { id: email } })
          }
        })
        .catch(e => {
          alert("wrong details")
          console.log(e);
        })
    }
    catch (e) {
      console.log(e);
    }
    handleHideRegisterModal();
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/", {
        email, password
      })
        .then(res => {
          if (res.data === "exist") {
            history("/", { state: { id: email } })
          } else if (res.data === "notexist") {
            alert("User has not signed up")
          }
        })
        .catch(e => {
          alert("wrong details")
          console.log(e);
        })
    }
    catch (e) {
      console.log(e);
    }
    handleHideLoginModal();
  }

  return (
    <div className='row' style={{ marginBottom: '100px' }}>
      <Navbar bg='light' expand='lg' fixed='top'>
        <Navbar.Brand style={{ marginLeft: "20px" }}>
          <img src='logo.png' alt='' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarNavDropdown' />

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
        setEmail={setEmail}
        setPassword={setPassword}
        setCPassword={setCPassword}
      />

      <AuthModal
        title='Login'
        show={showLoginModal}
        onHide={handleHideLoginModal}
        onSubmit={handleLogin}
        setEmail={setEmail}
        setPassword={setPassword}
      />
    </div>
  );
};

const AuthModal = ({ title, show, onHide, onSubmit, setEmail, setPassword, setCPassword }) => {

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className='d-flex justify-content-center w-100'>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <Form action='POST'>
          <Form.Group controlId='formBasicEmail' className='mb-5'>
            <Form.Control type='email' placeholder='Email' name='email' onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Group>
          <Form.Group controlId='formBasicPassword' className='mb-5'>
            <Form.Control type='password' placeholder='Password' name='password' onChange={(e) => { setPassword(e.target.value) }} />
          </Form.Group>
          {title === 'Register' && (
            <Form.Group controlId='formBasicPassword' className='mb-5'>
              <Form.Control type='password' placeholder='Confirm Password' onChange={(e) => { setCPassword(e.target.value) }} />
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