const express = require('express');
const { crearNuevoPrestamo, registrarLibro, obtenerTodosPrestamos } = require('../controllers/prestamoController');
const router = express.Router();

// Ruta para crear un nuevo préstamo
router.post('/prestamos', crearNuevoPrestamo);

// Ruta para registrar un libro en un préstamo
router.post('/libroprestamo', registrarLibro);

// Ruta para obtener todos los préstamos
router.get('/prestamos', obtenerTodosPrestamos);

module.exports = router;
