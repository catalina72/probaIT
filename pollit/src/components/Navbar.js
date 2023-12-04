import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Modal, Button, Form, FormLabel } from 'react-bootstrap';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { CloseButton } from 'react-bootstrap';


const NavBar = () => {
  const navigate = useNavigate();

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setCPassword] = useState('')

  const [ShowPollModal, setShowPollModal] = useState(false);
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([''])


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    setIsLoggedIn(!!token);
  }, []);

  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleHideRegisterModal = () => setShowRegisterModal(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleHideLoginModal = () => setShowLoginModal(false);

  const handleShowPollModal = () => setShowPollModal(true);
  const handleHidePollModal = () => setShowPollModal(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email, password, confirmPassword
      });

      if (response.status === 201) {
        console.log('Registration successful');
        navigate("/");
        handleHideRegisterModal();
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
    handleHideRegisterModal();
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });

      console.log('Login Response:', response);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        navigate('/');
      } else if (response.status === 401) {
        alert('User has not signed up');
      }
    } catch (error) {
      console.log(error);
      alert('Login failed');
    }

    handleHideLoginModal();
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    console.log('Logout successful');
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
                      Create Poll
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
      <PollModal
        title='Create a Poll'
        show={ShowPollModal}
        onHide={handleHidePollModal}
        onSubmit={handleHidePollModal}
        setQuestion={setQuestion}
        setAnswers={setAnswers}
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
          {title === 'Register' && (
            <Form.Group controlId='formBasicPassword' className='mb-5'>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                autoComplete='new-password'
                onChange={(e) => setCPassword(e.target.value)}
              />
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

const PollModal = ({ title, show, onHide, onSubmit, setQuestion, setAnswers }) => {
  const [question, setQuestionLocal] = useState('');
  const [answers, setAnswersLocal] = useState(['']);

  const handleAddAnswer = () => {
    setAnswersLocal([...answers, '']);
  };

  const handleRemoveAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers.splice(index, 1);
    setAnswersLocal(updatedAnswers);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswersLocal(updatedAnswers);
  };

  const handleSubmit = () => {
    onSubmit({ question: question, answers: answers });
    setQuestionLocal('');
    setAnswersLocal(['']);
    onHide();
  };

  return (
    <Modal centered show={show} onHide={onHide} size='lg' style={{ marginTop: "50px" }}>
      <Modal.Header closeButton>
        <Modal.Title className='d-flex justify-content-center w-100'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formBasicQuestion' className='mb-4'>
            <label for='question' style={{ color: 'white' }}>Title</label>
            <Form.Control
              className='poll-modal-form-control'
              type='text'
              placeholder='Type your question here'
              id='question'
              value={question}
              onChange={(e) => {
                setQuestionLocal(e.target.value);
                setQuestion(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <FormLabel for='votingType' style={{ color: 'white' }}>Voting type</FormLabel>
            <Form.Check
              style={{ color: 'white' }}
              type='radio'
              label='Single choice'
              id='single' />
            <Form.Check
              style={{ color: 'white', paddingBottom: '20px' }}
              type='radio'
              label='Multiple choice'
              id='multiple' />

          </Form.Group>
          <Form.Group controlId='formBasicAnswers'>
            <label for='answers' style={{ color: 'white' }}>Answer Options</label>
            {answers.map((answer, index) => (
              <div key={index} className='d-flex mb-3'>
                <Form.Control
                  className='poll-modal-form-control'
                  type='text'
                  id='answers'
                  placeholder={`Option ${index + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                <CloseButton
                  onClick={() => handleRemoveAnswer(index)}
                  className='close-button'
                />
              </div>
            ))}
            <Button className='add-button' onClick={handleAddAnswer} style={{ marginBottom: '50px' }}>
              + Add option
            </Button>
          </Form.Group>
          <div className='d-flex justify-content-center'>
            <Button className='btn-submit' onClick={handleSubmit}>
              Create Poll
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NavBar;