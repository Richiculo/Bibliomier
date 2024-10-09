const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para registrar un usuario
router.post('/register', registerUser);

// Ruta para login
router.post('/login', loginUser);

module.exports = router;
