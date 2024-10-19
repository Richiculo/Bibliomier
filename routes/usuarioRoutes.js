const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, updateUserRoles, updateUserPassword, updateUserName, updateUserCorreo } = require('../controllers/userController');


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



module.exports = router;
