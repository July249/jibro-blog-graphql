const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email)
    return res
      .status(400)
      .json({ message: 'Username, password and email are required.' });

  // check for duplicated usernames in the db
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict

  try {
    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);

    // create and store the new user
    const result = await User.create({
      username,
      email,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleRegister };
