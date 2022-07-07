module.exports = function ProjectController(Project,UserRole){
    return {
        /* GET Projects */
        getProjects: async (req, res) => {
            const projects = await Project.findAll();
            res.json(projects);
        },

        /* POST Projects */
        createProject: async (req, res) => {
            const project = req.body;
            if(project.title && project.description && project.start_date && project.status && project.category_id){
                const newProject = await Project.create({...project,user_id: req.user.id});
                res.json(newProject);
            }else{
                res.status(422).json({
                    message: "Tous les champs sont obligatoires"
                });
            }
        },

        /* GET Project by id */
        getProjectById: async (req, res) => {
            const id = req.params.id;
            const projectRequest = await Project.findOne({where: {id: id}});
            res.status(projectRequest ? 200 : 404).json(projectRequest ? projectRequest : {});
        },

        /* PUT Project by id */
        updateProject: async (req, res) => {
            const id = req.params.id;
            const project = req.body;
            const currentUser = req.user;

            const projectRequest = await Project.findOne({where: {id: id}});
            if(projectRequest){
                if(currentUser.role === UserRole.ADMIN || currentUser.id === projectRequest.user_id){
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
        },

        /* DELETE Project by id */
        deleteProject: async (req, res) => {
            const id = req.params.id;
            const currentUser = req.user;

            const projectRequest = await Project.findOne({where: {id: id}});
            if(projectRequest){
                if(currentUser.role === UserRole.ADMIN || currentUser.id === projectRequest.user_id){
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
        }
    }
}