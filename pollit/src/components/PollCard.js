import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import './PollCard.css';

const PollCard = ({ title, question, options, onVote, onDelete }) => {

  const handleVote = () => {
  };

  return (
	<Card style={{ height: '300px', overflowY: 'auto', margin: '20px' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{question}</Card.Text>
		<Card.Text className='text-muted' style={{fontSize:'0.7rem'}}>Make a chocie:</Card.Text>
        <Form style={{lineBreak:'100px'}}>
          {options.map((option, index) => (
            <Form.Check
              key={index}
              type="radio"
              label={option}
              name="pollOptions"
              id={`option-${index}`}
            />
          ))}
        </Form>
		<Button onClick={onDelete} style={{ backgroundColor: 'rgba(4, 57, 94, 1)', border:'2px rgba(4, 57, 94, 1)', position:'absolute', bottom:'30px'}}>
          Delete
        </Button>
        <Button onClick={handleVote} style={{ backgroundColor: 'rgba(4, 57, 94, 1)', border:'2px rgba(4, 57, 94, 1)', right:'15px', position:'absolute', bottom:'30px'}}>
          Vote
        </Button>
		
        
      </Card.Body>
    </Card>
  );
};

export default PollCard;