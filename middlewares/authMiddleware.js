const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }
const tokenPart=token.split(' ')[1];
    try {
        const verified = jwt.verify(token, 'secretKey');
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
