const express = require('express');
const router = express.Router();
const { find, createBook, editBook, removeBook} = require('../controllers/bookController');


// Ruta protegida para obtener todos los libros
router.get('/libros',find);

// Ruta para agregar un libro (solo para administradores con rol 4)
router.post('/libros',createBook);

// Ruta para actualizar un libro (solo para administradores con rol 4)
router.put('/libros/:id', editBook);

// Ruta para eliminar un libro (solo para administradores con rol 4)
router.delete('/:id', removeBook);

module.exports = router;
