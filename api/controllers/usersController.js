const User = require('../models/User');

// GET USER
const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'User ID required.' });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches ID ${req.params.id}.` });
  }
  res.json(user);
};

// UPDATE USER
const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required.' });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches ID ${req.body.id}.` });
  }
  if (req.body?.username) user.username = req.body.username;
  if (req.body?.email) user.email = req.body.email;
  const result = await user.save();
  res.json(result);
};

// DELETE USER
const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: 'User ID required.' });

  const user = await user.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches ID ${req.body.id}.` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: 'No users found.' });
  res.json(users);
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
