const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const { UserController } = require('../controllers');

router.get('/',authJwt,UserController.getUsers);
router.get('/:id',authJwt,UserController.getUserById);
router.post('/',UserController.createUser);
router.put('/:id',authJwt,UserController.updateUser);
router.delete('/:id',authJwt,UserController.deleteUser);

module.exports = router;