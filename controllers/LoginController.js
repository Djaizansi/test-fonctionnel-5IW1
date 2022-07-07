module.exports = function LoginController(User,bcrypt,generateAccessToken) {
    return {
        authUser: (req, res) => {
            const { email, password } = req.body;
            if(email && password) {
                User.findOne({
                    where: {email}
                })
                    .then(user => {
                        if(user) {
                            if(bcrypt.compareSync(password, user.password)) {
                                const accessToken = generateAccessToken({
                                    id: user.id,
                                    email: user.email,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    role: user.role
                                });
                                res.json({
                                    token: accessToken
                                });
                            } else {
                                res.status(401).json({
                                    error: 'Identifiant incorrect (password)'
                                });
                            }
                        } else {
                            res.status(401).json({
                                error: 'Identifiant incorrect'
                            });
                        }
                    })
            }else {
                res.status(400).json({
                    message: "Entrez un email et un mot de passe"
                });
            }
        }
    };
}