const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.param('id', userController.checkID);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUSer)
  .get(userController.getUser);

module.exports = router;
