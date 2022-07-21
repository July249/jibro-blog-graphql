const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const ROLES_LIST = require('../config/roleList');
const verifyRoles = require('../middleware/verifyRoles');

router
  .route('/')
  .post(categoriesController.createNewCat)
  .get(categoriesController.getCat)
  .get(categoriesController.getAllCats);

router
  .route('/:id')
  .post(categoriesController.createNewCat)
  .get(categoriesController.getCat)
  .get(categoriesController.getAllCats)
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    categoriesController.updateCat
  )
  .delete(verifyRoles(ROLES_LIST.Admin), categoriesController.deleteCat);

module.exports = router;
