const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {

    try{
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const data = jwt.verify(token, 'shhh');
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({error: "Please authenticate a valid token"});
    }
}

module.exports = fetchuser;