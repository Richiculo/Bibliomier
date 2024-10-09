const express = require('express');
const router = express.Router();
const { find, createBook, editBook, removeBook} = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta protegida para obtener todos los libros
router.get('/libros',find);

// Ruta para agregar un libro (solo para administradores con rol 4)
router.post('/libros', authMiddleware, (req, res, next) => {
    if (req.user.rol !== 4) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden agregar libros.' });
    }
    next();
}, createBook);

// Ruta para actualizar un libro (solo para administradores con rol 4)
router.put('/libros/:id', authMiddleware, (req, res, next) => {
    if (req.user.rol !== 4) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden actualizar libros.' });
    }
    next();
}, editBook);

// Ruta para eliminar un libro (solo para administradores con rol 4)
router.delete('/:id', authMiddleware, (req, res, next) => {
    if (req.user.rol !== 4) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden eliminar libros.' });
    }
    next();
}, removeBook);

module.exports = router;
