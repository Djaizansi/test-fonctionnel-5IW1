module.exports = function CategoryController(Category, UserRole) {
    return {
        /* GET Categories */
        getCategories: async (req, res) => {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        },

        /* POST Category */
        createCategory: async (req, res) => {
            const category = req.body;
            if(category.name){
                const findCategory = await Category.findOne({where: {name: category.name}});
                if(!findCategory){
                    const newCategory = await Category.create(category);
                    res.status(201).json(newCategory);
                }else{
                    res.sendStatus(400);
                }
            }else{
                res.sendStatus(422);
            }
        },

        /* GET Category by id */
        getCategoryById: async (req, res) => {
            const id = req.params.id;
            const categoryRequest = await Category.findOne({where: {id: id}});
            if(categoryRequest){
                res.status(200).json(categoryRequest);
            }else{
                res.sendStatus(404);
            }
        },

        /* PUT Category by id */
        updateCategory: async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const currentUser = req.user;

            if(currentUser.role === UserRole.ADMIN){
                const categoryRequest = await Category.findOne({where: {id: id}});
                if(categoryRequest){
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
        },

        /* DELETE Category by id */
        deleteCategory: async (req, res) => {
            const id = req.params.id;
            const currentUser = req.user;

            if(currentUser.role === UserRole.ADMIN){
                const categoryRequest = await Category.findOne({where: {id: id}});
                if(categoryRequest){
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
        }
    }
}