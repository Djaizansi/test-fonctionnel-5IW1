const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');

router.get('/',authJwt,getUsers);
router.get('/:id',authJwt,getUserById);
router.post('/',createUser);
router.put('/:id',authJwt,updateUser);
router.delete('/:id',authJwt,deleteUser);

module.exports = router;