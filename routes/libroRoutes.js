const express = require('express');
const {
    adLibro,
    getLibro,
    getbyName,
    updLibro,
    delLibro,
    getLibroById,
    prestamosLibro
} = require('../controllers/libroController');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get('/libros', getLibro);
router.get('/libros/:id', getLibroById);
router.get('/search', getbyName);

router.post('/prestamo/:id', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const libroId = req.params.id;


    prestamosLibro(userId, libroId)
        .then((resultado) => res.status(201).json(resultado))
        .catch((error) => res.status(500).json({ error: 'Error realizando el préstamo' }));
});
router.post('/libros', authMiddleware, (req, res, next) => {
    if (req.user.rol !== 4) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden agregar libros.' });
    }
    next();
}, adLibro);
router.put('/libros/:id', authMiddleware, (req, res, next) => {
    if (req.user.rol !== 4) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden actualizar libros.' });
    }
    next();
}, updLibro);
router.delete('/:id', authMiddleware, (req, res, next) => {
    if (req.user.rol !== 4) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden eliminar libros.' });
    }
    next();
}, delLibro);

module.exports = router;