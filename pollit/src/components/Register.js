import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ title, show, onHide, handleShowLoginModal}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setCPassword] = useState('')

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (response.status === 201) {
        console.log('Registration successful');
        onHide();
        handleShowLoginModal();
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  };

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
            <Form.Control type='email' placeholder='Email' autoComplete='username' name='email' onChange={(e) => { setEmail(e.target.value) }} />
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
            <Form.Group controlId='formBasicPassword' className='mb-5'>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                autoComplete='new-password'
                onChange={(e) => setCPassword(e.target.value)}
              />
            </Form.Group>
          <Button className='btn-submit' onClick={handleRegister}>
           Create account
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

};

export default Register;