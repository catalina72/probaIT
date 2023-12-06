import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PollCard from './PollCard';
const PollsPage = () => {
  const [polls, setPolls] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  const isOwner = async (pollId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return false;
      }
  
      const response = await axios.get(
        `http://localhost:3000/polls/verify-owner/${pollId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      return response.status === 200;
    } catch (error) {
      console.error('Error verifying ownership:', error);
      return false;
    }
  };

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('http://localhost:3000/polls');
        setPolls(response.data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = async (pollId, optionIndex) => {
    try {
      console.log('Option Index:', optionIndex);
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:3000/polls/vote/${pollId}`,
        { optionIndex },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Vote recorded successfully:', response.data);
        setHasVoted(true);
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error recording vote:', error);
      alert('Failed to record vote');
    }
  };

  const handleDelete = async (pollId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:3000/polls/${pollId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Poll deleted successfully:', response.data);
        window.location.reload();
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting poll:', error);
      alert('Failed to delete poll');
    }
  };

  return (
    <Container>
      <Row>
        {polls.map((poll) => (
          <Col key={poll._id} md={6} className='mb-3'>
            <PollCard
              pollId={poll._id}
              title={poll.title}
              question={poll.question}
              options={poll.options}
              type = {poll.type}
              onVote={(optionIndex) => handleVote(poll._id, optionIndex)}
              onDelete={() => handleDelete(poll._id)}
              isOwner={isOwner(poll._id)}
              hasVoted={hasVoted}
              setHasVoted={setHasVoted}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PollsPage;