import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormLabel } from 'react-bootstrap';
import { CloseButton } from 'react-bootstrap';

const PollModal = ({ title, show, onHide, onSubmit, setQuestion, setAnswers, setVotingType }) => {
	const [question, setQuestionLocal] = useState('');
	const [answersLocal, setAnswersLocal] = useState(['', '', '']);
	const [votingType, setVotingTypeLocal] = useState('single');
	const handleAddAnswer = () => {
		setAnswers((prevAnswers) => [...prevAnswers, '']);
		setAnswersLocal((prevAnswers) => [...prevAnswers, '']);
	};

	const handleRemoveAnswer = (index) => {
		setAnswers((prevAnswers) => {
			const updatedAnswers = [...prevAnswers];
			updatedAnswers.splice(index, 1);
			return updatedAnswers;
		});
		setAnswersLocal((prevAnswers) => {
			const updatedAnswers = [...prevAnswers];
			updatedAnswers.splice(index, 1);
			return updatedAnswers;
		});
	};

	const handleAnswerChange = (index, value) => {
		setAnswers((prevAnswers) => {
			const updatedAnswers = [...prevAnswers];
			updatedAnswers[index] = value;
			return updatedAnswers;
		});
		setAnswersLocal((prevAnswers) => {
			const updatedAnswers = [...prevAnswers];
			updatedAnswers[index] = value;
			return updatedAnswers;
		});
	};

	const handleVotingTypeChange = (e) => {
		setVotingType(e.target.value);
		setVotingTypeLocal(e.target.value);
	};

	useEffect(() => {
		setQuestionLocal(question);
	}, [question]);

	useEffect(() => {
		setVotingTypeLocal(votingType);
	}, [votingType]);

	return (
		<Modal centered show={show} onHide={onHide} size='lg' style={{ marginTop: '50px' }}>
			<Modal.Header closeButton>
				<Modal.Title className='d-flex justify-content-center w-100'>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId='formBasicQuestion' className='mb-4'>
						<label htmlFor='question' style={{ color: 'white' }}>Title</label>
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
						<FormLabel htmlFor='votingType' style={{ color: 'white' }}>Voting type</FormLabel>
						<Form.Check
							style={{ color: 'white' }}
							type='radio'
							label='Single choice'
							id='single'
							value='single'
							checked={votingType === 'single'}
							onChange={handleVotingTypeChange}
						/>
						<Form.Check
							style={{ color: 'white', paddingBottom: '20px' }}
							type='radio'
							label='Multiple choice'
							id='multiple'
							value='multiple'
							checked={votingType === 'multiple'}
							onChange={handleVotingTypeChange}
						/>
					</Form.Group>
					<Form.Group controlId='formBasicAnswers'>
						<label htmlFor='answers' style={{ color: 'white' }}>Answer Options</label>
						{answersLocal.map((answer, index) => (
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
						<Button className='btn-submit' onClick={onSubmit}>
							Create Poll
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default PollModal;