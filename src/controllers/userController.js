import User from '../models/users.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, username, age, password } = req.body;
    const user = new User({ name, email, username, age, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err });
  }
};
