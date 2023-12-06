import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ title, show, onHide, handleHideLoginModal }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password,
      });

      console.log('Login Response:', response);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        window.location.reload();
        onHide();
      } else if (response.status === 401) {
        alert('User has not signed up');
      }
    } catch (error) {
      console.log(error);
      alert('Login failed');
    }
  }

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
            <Form.Control type='email' placeholder='Email' autoComplete='username' name='email' onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='formBasicPassword' className='mb-5'>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className='btn-submit' onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;