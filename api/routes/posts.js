const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const ROLES_LIST = require('../config/roleList');
const verifyRoles = require('../middleware/verifyRoles');

router
  .route('/')
  .get(postsController.getAllPosts)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    postsController.createNewPost
  );

router
  .route('/:id')
  .get(postsController.getPost)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    postsController.updatePost
  )
  .delete(verifyRoles(ROLES_LIST.Admin), postsController.deletePost);

module.exports = router;
