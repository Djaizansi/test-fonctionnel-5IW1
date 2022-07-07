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
                                res.sendStatus(401);
                            }
                        } else {
                            res.sendStatus(401);
                        }
                    })
            }else {
                res.sendStatus(400);
            }
        }
    };
}