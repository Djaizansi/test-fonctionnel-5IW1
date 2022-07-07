const express = require('express');
const { LoginController } = require('../controllers');
const router = express.Router();

/* POST login */
router.post('/', LoginController.authUser);

module.exports = router;