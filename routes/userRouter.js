const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/login').post(authController.checkLogin);

router.param('id', userController.checkID);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.checkBody, userController.createUser);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUSer)
  .get(userController.getUser);

module.exports = router;
