const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller');

router.get('/',authJwt,getCategories);
router.get('/:id',authJwt,getCategoryById);
router.post('/',authJwt,createCategory);
router.put('/:id',authJwt,updateCategory);
router.delete('/:id',authJwt,deleteCategory);

module.exports = router;