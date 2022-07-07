const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const { CategoryController } = require('../controllers');

router.get('/',authJwt,CategoryController.getCategories);
router.get('/:id',authJwt,CategoryController.getCategoryById);
router.post('/',authJwt,CategoryController.createCategory);
router.put('/:id',authJwt,CategoryController.updateCategory);
router.delete('/:id',authJwt,CategoryController.deleteCategory);

module.exports = router;