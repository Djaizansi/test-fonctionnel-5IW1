const models = require('../models');
const UserRole = require("../enum/UserRole");
const Category = models.Category;

/* GET Categories */
const getCategories = async (req, res) => {
    const categoriesRequest = await Category.findAll();
    const categories = categoriesRequest.map(category => category.dataValues);
    res.json(categories);
};

/* POST Category */
const createCategory = async (req, res) => {
    const category = req.body;
    if(category.name){
        const findCategory = await Category.findOne({where: {name: category.name}});
        if(!findCategory?.dataValues){
            const newCategory = await Category.create(category);
            res.json(newCategory);
        }else{
            res.status(400).json({
                message: "La categorie existe déjà"
            });
        }
    }else{
        res.status(422).json({
            message: "Tous les champs sont obligatoires"
        });
    }
};

/* GET Category by id */
const getCategoryById = async (req, res) => {
    const id = req.params.id;
    const categoryRequest = await Category.findOne({where: {id: id}});
    const category = categoryRequest?.dataValues;
    res.status(category ? 200 : 404).json(category ? category : {});
};

/* PUT Category by id */
const updateCategory = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const currentUser = req.user;

    if(currentUser.role === UserRole.ADMIN){
        const categoryRequest = await Category.findOne({where: {id: id}});
        if(categoryRequest?.dataValues){
            const categoryResponse = await categoryRequest.update(user);
            res.status(200).json(categoryResponse);
        }else{
            res.status(404).json({
                message: "La catégorie n'existe pas"
            });
        }
    }else{
        res.status(403).json({
            message: "Vous n'avez pas les droits pour accéder à cette ressource"
        });
    }
};

/* DELETE Category by id */
const deleteCategory = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.user;

    if(currentUser.role === UserRole.ADMIN){
        const categoryRequest = await Category.findOne({where: {id: id}});
        if(categoryRequest?.dataValues){
            await categoryRequest.destroy();
            res.status(204).json();
        }else{
            res.status(404).json({
                message: "La catégorie n'existe pas"
            });
        }
    }else{
        res.status(403).json({
            message: "Une erreur est survenue"
        });
    }
};

module.exports = {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};