const express = require('express');
const {
    adLibro,
    getLibro,
    updLibro,
    delLibro,
    searchLibros

} = require('../controllers/libroController');
const {crearNuevoPrestamo} = require("../controllers/prestamoController");
const libroController = require('../controllers/libroController');

const router = express.Router();

router.get('/libros', getLibro);
router.get('/libros/:id', libroController.getLibroById);
router.get('/search', searchLibros);
router.post('/libros', adLibro);
router.post('/prestamo/:id', crearNuevoPrestamo);

router.put('/libros/:id',updLibro);
router.delete('/libros/:id', delLibro);
router.get('/api/categorias', libroController.categorias);



module.exports = router;

