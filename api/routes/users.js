const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const ROLES_LIST = require('../config/roleList');
const verifyRoles = require('../middleware/verifyRoles');

router
  .route('/:id')
  .get(usersController.getUser)
  .get(usersController.getAllUsers)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),
    usersController.updateUser
  )
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

module.exports = router;
