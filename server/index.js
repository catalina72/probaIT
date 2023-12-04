const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/user.model');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pollIT');

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
		console.log("User not found");
		return res.status(401).json({ error: 'The email adress is invalid!' });
	  }
  
	  const passwordMatch = await bcrypt.compare(password, user.password);
  
	  if (passwordMatch) {
		console.log("Login successful");
		const token = jwt.sign({_id: user._id}, 'SecretKey');
		console.log(token);
		return res.status(200).json({ message: 'Login successful', token });
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

app.listen(3000, () => {
  console.log('Server is on port 3000');
})