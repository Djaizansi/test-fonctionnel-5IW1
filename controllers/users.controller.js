const models = require('../models');
const UserRole = require("../enum/UserRole");
const User = models.User;

/* GET Users */
const getUsers = async (req, res) => {
    const currentUser = req.user;
    const usersRequest = await User.findAll();
    if(currentUser.role === UserRole.ADMIN) {
        const users = usersRequest.map(user => user.dataValues);
        res.json(users);
    } else {
        res.status(403).json({message: "Vous n'êtes pas authorisé à accéder à cette ressource"});
    }
};

/* POST User */
const createUser = async (req, res) => {
    const user = req.body;
    if(user.last_name && user.first_name && user.email && user.password && user.confirmPassword){
        const findUser = await User.findOne({where: {email: user.email}});
        if(!findUser?.dataValues){
            if(user.password === user.confirmPassword){
                const userRequest = await User.create(user);
                const userResponse = userRequest.dataValues;
                res.status(201).json(userResponse);
            }else{
                res.status(400).json({
                    message: "Les mots de passe ne correspondent pas"
                });
            }
        }else{
            res.status(400).json({
                message: "L'email existe déjà"
            });
        }
    }else{
        res.status(422).json({
            message: "Tous les champs sont obligatoires"
        });
    }
};

/* GET User by id */
const getUserById = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.user;

    if(currentUser.id === parseInt(id) || currentUser.role === UserRole.ADMIN){
        const userRequest = await User.findOne({where: {id: id}});
        const user = userRequest?.dataValues;
        res.status(user ? 200 : 404).json(user ? user : {});
    }else{
        res.status(403).json({
            message: "Vous n'avez pas les droits pour accéder à cette ressource"
        });
    }
};

/* PUT User by id */
const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const currentUser = req.user;

    if(currentUser.id === parseInt(id) || currentUser.role === UserRole.ADMIN){
        const userRequest = await User.findOne({where: {id: id}});
        if(userRequest?.dataValues){
            const userResponse = await userRequest.update(user);
            res.status(200).json(userResponse);
        }else{
            res.status(404).json({
                message: "L'utilisateur n'existe pas"
            });
        }
    }else{
        res.status(403).json({
            message: "Vous n'avez pas les droits pour accéder à cette ressource"
        });
    }
};

/* DELETE User by id */
const deleteUser = async (req, res) => {
    const id = req.params.id;
    const currentUser = req.user;

    if(currentUser.role === UserRole.ADMIN && currentUser.id !== parseInt(id)){
        const userRequest = await User.findOne({where: {id: id}});
        if(userRequest?.dataValues){
            await userRequest.destroy();
            res.status(204).json();
        }else{
            res.status(404).json({
                message: "L'utilisateur n'existe pas"
            });
        }
    }else{
        res.status(403).json({
            message: "Une erreur est survenue"
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}