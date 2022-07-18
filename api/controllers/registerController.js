/* const usersDB = {
  users: require('../models/User'),
  setUsers: function (data) {
    this.users = data;
  },
}; */
const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  // check for duplicated usernames in the db
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    // store the new user
    const newUser = new User({
      username: req.body.username,
      roles: { User: 2001 },
      email: req.body.email,
      password: hashedPwd,
    });
    // write userinfo on usersDB
    const user = await newUser.save();
    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
    /* usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'User'),
      JSON.stringify(usersDB.users)
    ); */
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleRegister };
