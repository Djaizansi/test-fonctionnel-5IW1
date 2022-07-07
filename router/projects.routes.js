const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const { ProjectController } = require('../controllers');

router.get('/', ProjectController.getProjects);
router.post('/',authJwt, ProjectController.createProject);
router.get('/:id', ProjectController.getProjectById);
router.put('/:id',authJwt, ProjectController.updateProject);
router.delete('/:id',authJwt, ProjectController.deleteProject);

module.exports = router;