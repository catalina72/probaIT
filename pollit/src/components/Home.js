import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PollsPage from './PollsPage';
import './Home.css'
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location=useLocation();
  return (
    <Container fluid>
      <Row className='align-items-center'>
        <Col xs={6}>
          <div className='text'>
            Opiniile sunt mai importante ca niciodată. 
            Platformele de sondaje permit organizatorilor 
            să culeagă feedback direct de la audiența lor 
            și să înțeleagă mai bine nevoile și dorințele acesteia.
          </div>
        </Col>
        <Col xs={6}>
          <img src='testoasa 1.png' alt='' className='img-fluid'/>
        </Col>
      </Row>
      <PollsPage />
    </Container>
  );
};

export default Home;