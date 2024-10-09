const { createUser, getUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;
const rolid = req.body.rol||1;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear el usuario
        const newUser = await createUser({ nombre, email, password,rolid });
        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro', error });
    }
};

// Controlador para login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log("Email recibido:", email);

    try {
        // Buscar el usuario por email
        const user = await getUserByEmail(email);
        console.log("Usuario encontrado:", user);

        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.contraseña);
        console.log("¿Contraseña coincide?", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.usuarioid, rol: user.rolid }, 'secretKey', { expiresIn: '1h' });
        console.log("Token generado:", token);

        res.status(200).json({ message: 'Login exitoso', token, nombre: user.nombre_usuario });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error en el login', error });
    }
};


module.exports = {
    registerUser,
    loginUser
};