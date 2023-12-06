import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Modal, Button, Form, FormLabel } from 'react-bootstrap';
import './Navbar.css';

import axios from 'axios'
import Register from './Register'
import Login from './Login'
import PollModal from './PollModal'

const NavBar = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
    document.getElementById('navbarNavDropdown').classList.remove('show');
  };

  const handleHideRegisterModal = () => setShowRegisterModal(false);

  const [answers, setAnswers] = useState(['']);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [ShowPollModal, setShowPollModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [votingType, setVotingType] = useState('single');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
    document.getElementById('navbarNavDropdown').classList.remove('show');
  };

  const handleShowPollModal = () => {
    setShowPollModal(true);
    document.getElementById('navbarNavDropdown').classList.remove('show');
  };

  const handleHideLoginModal = () => setShowLoginModal(false);

  const handleHidePollModal = () => setShowPollModal(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload();
    console.log('Logout successful');
  };

  const handleCreatePoll = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/polls',
        { question, options: answers, type: votingType },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Poll created successfully:', response.data);
        handleHidePollModal();
        window.location.reload();
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error creating poll:', error);
      alert('Failed to create poll');
    }
  };

  return (
    <div className='row' style={{ marginBottom: '100px' }}>
      <Navbar bg='light' expand='lg' fixed='top'>
        <Navbar.Brand style={{ marginLeft: "20px" }}>
          <img src='logo.png' alt='' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarNavDropdown' />

        <Navbar.Collapse id='navbarNavDropdown' className='justify-content-end'>
          <Nav className='ml-auto'>
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <>
                {!ShowPollModal && (
                  <li>
                    <Button variant='link' onClick={handleShowPollModal}>
                      Create a Poll
                    </Button>
                  </li>
                )}
                <li>
                  <Button variant='link' onClick={handleLogout}>
                    Logout
                  </Button>
                </li>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Register
        title='Register'
        show={showRegisterModal}
        onHide={handleHideRegisterModal}
        handleShowLoginModal={handleShowLoginModal}
      />

      <Login
        title='Login'
        show={showLoginModal}
        onHide={handleHideLoginModal}
      />
      <PollModal
        title='Create a Poll'
        show={ShowPollModal}
        onHide={handleHidePollModal}
        onSubmit={handleCreatePoll}
        setQuestion={setQuestion}
        setAnswers={setAnswers}
        setVotingType={setVotingType}
      />
    </div>
  );
};

export default NavBar;