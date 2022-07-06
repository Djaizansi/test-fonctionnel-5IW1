const models = require('../models');
const UserRole = require("../enum/UserRole");
const Project = models.Project;

/* GET Projects */
const getProjects = async (req, res) => {
    const projectsRequest = await Project.findAll();
    const projects = projectsRequest.map(project => project.dataValues);
    res.json(projects);
};

/* POST Projects */
const createProject = async (req, res) => {
    const project = req.body;
    if(project.title && project.description && project.start_date && project.status && project.category_id){
        const newProject = await Project.create({...project,user_id: req.user.id});
        res.json(newProject);
    }else{
        res.status(422).json({
            message: "Tous les champs sont obligatoires"
        });
    }
};

/* GET Project by id */
const getProjectById = async (req, res) => {
    const id = req.params.id;
    const projectRequest = await Project.findOne({where: {id: id}});
    const project = projectRequest?.dataValues;
    res.status(project ? 200 : 404).json(project ? project : {});
};

/* PUT Project by id */
const updateProject = async (req, res) => {
    const id = req.params.id;
    const project = req.body;
    const currentUser = req.user;

    const projectRequest = await Project.findOne({where: {id: id}});
    if(projectRequest?.dataValues){
        if(currentUser.role === UserRole.ADMIN || currentUser.id === projectRequest.dataValues.user_id){
            const projectResponse = await projectRequest.update(project);
            res.status(200).json(projectResponse);
        }else{
            res.status(403).json({
                message: "Vous n'avez pas les droits nécessaires"
            });
        }
    }else{
        res.status(404).json({
            message: "Le project n'existe pas"
        });
    }
};

/* DELETE Project by id */
const deleteProject = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.user;

    const projectRequest = await Project.findOne({where: {id: id}});
    if(projectRequest?.dataValues){
        if(currentUser.role === UserRole.ADMIN || currentUser.id === projectRequest.dataValues.user_id){
            const projectResponse = await projectRequest.destroy();
            res.status(200).json(projectResponse);
        }else{
            res.status(403).json({
                message: "Vous n'avez pas les droits nécessaires"
            });
        }
    }else{
        res.status(404).json({
            message: "Le project n'existe pas"
        });
    }
};

module.exports = {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject
};