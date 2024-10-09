const jwt = require('jsonwebtoken');

const authMiddleware = (roleRequired) => (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no hay token' });
    }
    try {
        const verified = jwt.verify(token, 'secretKey');
        req.user = verified;

        if (req.user.rol !== roleRequired) {
            return res.status(403).json({ message: 'Acceso denegado, no tienes el rol adecuado' });
        }

        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;
