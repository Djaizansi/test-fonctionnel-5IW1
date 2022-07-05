const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const cert = process.env.JWT_SECRET;  // get public key
    const token = req.headers?.authorization?.split(' ')[1]; // BEARER Token -> get only token
    jwt.verify(token, cert, async function (_, user) {
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401);
            res.json({message: "Unauthorized JWT expire or not valid"});
        }
    });
}