const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, updateUserRoles, updateUserPassword, updateUserName, updateUserCorreo, prestamosActivos, prestamosDevolver, hacerReseña } = require('../controllers/userController');


// Ruta para registrar un usuario
router.post('/register', registerUser);

// Ruta para login
router.post('/login', loginUser);

// Ruta protegida: obtener lista de usuarios (solo administradores)
router.get('/users',  getUser);

// Ruta protegida: actualizar rol de usuario (solo administradores)
router.put('/users/update',  updateUserRoles);

router.put('/users/:id', updateUserPassword);

router.put('/users/name/:id', updateUserName);

router.put('/users/correo/:id', updateUserCorreo);

//ruta gestion de prestamos
router.get('/users/prestamos/activos/:miembroid', prestamosActivos);

//ruta de devolver prestamo
router.post('/users/prestamos/devolver/:prestamoid', prestamosDevolver);

//ruta de reseña
router.post('/users/review', hacerReseña);



module.exports = router;
