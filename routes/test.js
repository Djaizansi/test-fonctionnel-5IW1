const express = require('express');
const router = express.Router();

/* GET Test */
router.get('/', function(req, res) {
    res.json({ test: 'test' });
});

module.exports = router;