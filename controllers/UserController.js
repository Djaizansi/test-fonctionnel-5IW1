const UserRole = require("../enum/UserRole");

module.exports = function UserController(User){
    return {
        /* GET Users */
        getUsers: async (req, res) => {
            const currentUser = req.user;
            if(currentUser.role === UserRole.ADMIN) {
                const usersRequest = await User.findAll();
                res.status(200).json(usersRequest);
            } else {
                res.sendStatus(403);
            }
        },

        /* POST User */
        createUser: async (req, res) => {
            const user = req.body;
            if(user?.last_name && user?.first_name && user?.email && user?.password && user?.confirmPassword){
                const findUser = await User.findOne({where: {email: user.email}});
                if(!findUser){
                    if(user.password === user.confirmPassword){
                        const userRequest = await User.create(user);
                        res.status(201).json(userRequest);
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
                res.sendStatus(422);
            }
        },

        /* GET User by id */
        getUserById: async (req, res) => {
            const id = req.params.id;
            const currentUser = req.user;

            if(currentUser.id === parseInt(id) || currentUser.role === UserRole.ADMIN){
                const userRequest = await User.findOne({where: {id: id}});
                if(userRequest) {
                    res.status(200).json(userRequest);
                }else{
                    res.sendStatus(404);
                }
            }else{
                res.sendStatus(403);
            }
        },

        /* PUT User by id */
        updateUser: async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const currentUser = req.user;

            if(currentUser.id === parseInt(id) || currentUser.role === UserRole.ADMIN){
                const userRequest = await User.findOne({where: {id: id}});
                if(userRequest){
                    const userUpdate = await User.update(user, {where: {id: id}});
                    res.status(200).json(userUpdate);
                }else{
                    res.sendStatus(404);
                }
            }else{
                res.sendStatus(403);
            }
        },

        /* DELETE User by id */
        deleteUser: async (req, res) => {
            const id = req.params.id;
            const currentUser = req.user;

            if(currentUser.role === UserRole.ADMIN && currentUser.id !== parseInt(id)){
                const userRequest = await User.findOne({where: {id: id}});
                console.log(userRequest);
                if(userRequest){
                    await User.destroy({where: {id: id}});
                    res.sendStatus(204);
                }else{
                    res.sendStatus(404);
                }
            }else{
                res.sendStatus(403);
            }
        }
    }
}