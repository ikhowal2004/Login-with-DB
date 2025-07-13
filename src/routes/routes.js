import express from 'express';
import bcrypt from 'bcrypt';
import Test1 from '../models/users.js';

const userRoutes = express.Router();

// SIGN UP
userRoutes.post('/signup', async (req, res) => {
  try {
    const { name, email, username, age, password } = req.body;

    const existingUser = await Test1.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Test1({ name, email, username, age, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ message: 'Signup failed', error });
  }
});

// LOGIN
userRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Test1.findOne({ email });

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password');
    }

    res.status(200).send(`Welcome ${user.name}, you are logged in successfully!`);
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
});

export default userRoutes;
