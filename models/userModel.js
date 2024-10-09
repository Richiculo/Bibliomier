const pool = require('../db');
const bcrypt = require('bcryptjs');

// Función para crear un nuevo usuario
const createUser = async ({ nombre, email, password, rol }) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO Usuario (rolid,nombre_usuario,contraseña,correo_electronico) VALUES ($1, $2, $3, $4) RETURNING *',
            [1, nombre, hashedPassword, email]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creando el usuario', error);
        throw error;
    }
};

// Función para buscar usuario por email
const getUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM Usuario WHERE correo_electronico = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error buscando el usuario por email', error);
        throw error;
    }
};

module.exports = {
    createUser,
    getUserByEmail
};
