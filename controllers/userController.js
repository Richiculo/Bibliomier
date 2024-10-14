const { createUser, getUserByEmail,getUsers,updateUserRole } = require('../models/userModel');
const { logUserActivity } = require('../models/userActivityLogModel');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;
const rolid = req.body.rol||1;
    try {
      
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        
        const newUser = await createUser({ nombre, email, password,rolid });
        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
        await logUserActivity(user.usuarioid, 'Registro de usuario');
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
        const token = jwt.sign({ id: user.usuarioid, nombre: user.nombre_usuario, rol: user.rolid }, 'secretKey', { expiresIn: '1h' });
        console.log("Token generado:", token);

        await logUserActivity(user.usuarioid, 'Inicio de sesión');

        res.status(200).json({ message: 'Login exitoso', token, nombre: user.nombre_usuario });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error en el login', error });
    }
};

const updateUserRoles = async (req, res) => {
    const { userId, newRole } = req.body;

    console.log('Datos recibidos para actualizar rol:', { userId, newRole });

    try {
        const updatedUser = await updateUserRole(userId, newRole);
        console.log('Usuario actualizado:', updatedUser);
        res.status(200).json({ message: 'Rol actualizado con éxito', user: updatedUser });
    } catch (error) {
        console.error('Error actualizando el rol del usuario:', error);
        res.status(500).json({ message: 'Error actualizando el rol', error });
    }
};

const getUser = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo los usuarios', error });
    }
}




module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUserRoles
};
