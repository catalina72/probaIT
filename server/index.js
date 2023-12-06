const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/user.model');
const Poll = require('./models/poll.model');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pollIT');

const SecretKey = 'secretdiscret';

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Connected to the database');
});
connection.on('error', (err) => {
  console.error('Error connecting to the database:', err);
});

const emailRegex = /^[^\s@]+@gmail\.com$/;
const passwordRegex = /^.{8,32}$/;

app.get('/users', async (req, res) => {
	try {
	  const users = await User.find();
	  return res.status(200).json(users);
	} catch (error) {
	  console.error('Error fetching users:', error);
	  return res.status(500).json({ error: 'Error fetching users' });
	}
  });

  app.post('/register', async (req, res) => {
	try {
		console.log('Registration Request Body:', req.body);

		const { email, password, confirmPassword } = req.body;

		if (!emailRegex.test(email)) {
			console.log("Invalid email format");
			return res.status(400).json({ error: 'the filed must end in @gmail.com' });
		  }

		  if (!passwordRegex.test(password)) {
			console.log("Invalid password format");
			return res.status(400).json({ error: 'the filed is not between 8 and 32 characters' });
		  }

		const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already in use");
      return res.status(400).json({ error: 'That email address is already in use!' });
    }

	  if (password !== confirmPassword) {
		console.log("The passwords don't match");
		return res.status(400).json({ error: 'The passwords do not match!' });
	  }

	  const hashedPassword = await bcrypt.hash(password, 10);

	  const user = new User({ email, password: hashedPassword });

	  await user.save();
  
	  console.log('Registration successful');
	  return res.status(201).json({ message: 'Registration successful' });
	} catch (error) {
	  console.error('Error during registration:', error);
	  return res.status(500).json({ error: 'Internal server error' });
	}
  });

  app.post('/login', async (req, res) => {
	try {
	  const { email, password } = req.body;
	  const user = await User.findOne({ email });
  
	  if (!user) {
		console.log(email);
		return res.status(401).json({ error: 'The email adress is invalid!' });
	  }
  
	  const passwordMatch = await bcrypt.compare(password, user.password);
  
	  if (passwordMatch) {
		console.log("Login successful");
		const token = jwt.sign({_id: user._id}, SecretKey);
		console.log(token);
		const id = user._id;
		return res.status(200).json({ message: 'Login successful', token, id });
	  } else {
		console.log(password)
		console.log("Incorrect password");
		return res.status(401).json({ error: 'The password is invalid!' });
	  }
	} catch (error) {
	  console.error('Error during login:', error);
	  return res.status(500).json({ error: 'Internal server error' });
	}
  });

  const authenticateJWT = (req, res, next) => {
	const tokenHeader = req.header('Authorization');
  
  if (!tokenHeader) {
    return res.status(401).json({ error: 'Acces neautorizat.' });
  }
  const token = tokenHeader.split(' ')[1];

  console.log("Received token:", token);
	try {
		const decoded = jwt.verify(token, SecretKey);
		console.log(decoded);
		req.user_id = decoded._id;
		next();
	  } catch (error) {
		console.error('Error verifying token:', error);
		return res.status(403).json({ error: 'Token invalid.' });
	  }
  };

app.get('/polls', async (req, res) => {
  try {
    const polls = await Poll.find({});
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: 'Eroare la obținerea poll-urilor.' });
  }
});

app.post('/polls', authenticateJWT, async (req, res) => {
	const {question, options, type } = req.body;
  
	try {
	  const newPoll = new Poll({
		owner: req.user_id,
		question,
		options,
		type
	  });

	  newPoll.votes = new Array(options.length).fill(0);
  
	  await newPoll.save();
  
	  res.json(newPoll);
	} catch (error) {
	  res.status(500).json({ error: 'Eroare la crearea poll-ului.' });
	}
  });

  app.delete('/polls/:id', authenticateJWT, async (req, res) => {
	const pollId = req.params.id;
	if (!pollId) {
	  return res.status(400).json({ error: 'Poll ID is undefined' });
	}
  
	try {
	  const poll = await Poll.findOne({ _id: pollId, owner: req.user_id });
  
	  if (!poll) {
		return res.status(404).json({ error: 'The poll does not exist or you are not the owner.' });
	  }
  
	  await Poll.findByIdAndDelete(pollId);
	  return res.json({ message: 'Poll deleted successfully.' });
	} catch (error) {
	  console.error('Error deleting poll:', error);
	  return res.status(500).json({ error: 'Error deleting poll.' });
	}
  });
  app.patch('/polls/vote/:id', authenticateJWT, async (req, res) => {
	const pollId = req.params.id;
	const { optionIndex } = req.body;
	console.log(optionIndex);
  
	try {
	  const poll = await Poll.findById(pollId);
  
	  if (!poll) {
		return res.status(404).json({ error: 'Poll-ul nu există.' });
	  }

	  const user = await User.findById(req.user_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

	if(poll.voters.includes(user._id)) {
		return res.status(400).json({ error: 'You have already voted on this poll.' });
	}
  
	  poll.votes[optionIndex]++;
	  poll.voters.push(user._id);
	  await poll.save();
  
	  res.json(poll);
	} catch (error) {
	  res.status(500).json({ error: 'Eroare la votare.' });
	}
  });

  app.get('/polls/verify-owner/:pollId', authenticateJWT, async (req, res) => {
	try {
	  const pollId = req.params.pollId;
  
	  const poll = await Poll.findById(pollId);
  
	  if (!poll) {
		return res.status(404).json({ error: 'Poll not found' });
	  }

	  const tokenHeader = req.header('Authorization');
  
  if (!tokenHeader) {
    return res.status(401).json({ error: 'Acces neautorizat.' });
  }
  const token = tokenHeader.split(' ')[1];
  
	  const decoded = jwt.verify(token, SecretKey);

	  if (String(poll.owner) === String(decoded._id)) {
		return res.status(200).json({ message: 'User is the owner of the poll' });
	  } else {
		return res.status(403).json({ error: 'User is not the owner of the poll' });
	  }
	} catch (error) {
	  console.error('Error verifying ownership:', error);
	  return res.status(500).json({ error: 'Internal server error' });
	}
  });

app.listen(3000, () => {
  console.log('Server is on port 3000');
})