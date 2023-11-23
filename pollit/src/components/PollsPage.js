import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PollCard from './PollCard';

const PollsPage = () => {
  const polls = [
    {
      id: 1,
      question: 'Cine este coordonatorul departamentului de IT?',
      options: ['Edi', 'Mari', 'Bogdan'],
    },
    {
      id: 2,
      question: 'Ce animal se afla pe tricourile departamentului de IT?',
      options: ['Un elefant', 'O testoasa', 'Un lenes', 'Un caine'],
    },
    {
      id: 3,
      question: 'Ce animal se afla pe tricourile departamentului de IT?',
      options: ['Un elefant', 'O testoasa', 'Un lenes', 'Un caine'],
    },
    {
      id: 4,
      question: 'Ce animal se afla pe tricourile departamentului de IT?',
      options: ['Un elefant', 'O testoasa', 'Un lenes', 'Un caine'],
    },
  ];

  const handleVote = () => {

  };

  return (
    <Container>
      <Row>
        {polls.map((poll) => (
          <Col key={poll.id} md={6} className="mb-3">
            <PollCard
              title={poll.title}
              question={poll.question}
              options={poll.options}
              onVote={() => handleVote}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PollsPage;