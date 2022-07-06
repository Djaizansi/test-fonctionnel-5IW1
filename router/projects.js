const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projects.controller');

router.get('/', getProjects);
router.post('/',authJwt, createProject);
router.get('/:id', getProjectById);
router.put('/:id',authJwt, updateProject);
router.delete('/:id',authJwt, deleteProject);

module.exports = router;