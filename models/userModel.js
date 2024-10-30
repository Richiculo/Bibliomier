const pool = require('../db');
const bcrypt = require('bcryptjs');

//hacer reseña
const setReseña = async (miembroid, edicionid, libroid, calificacion, comentario) => {
    const query = `
        INSERT INTO reseña (miembroid, edicionid, libroid, calificacion, comentario, fecha_reseña)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING *;
    `;
    const values = [miembroid, edicionid, libroid, calificacion, comentario];
    const result = await pool.query(query, values);
    return result.rows[0];
};

//adicion para gestion de prestamo
const getPrestamosActivos = async (id) => {
    try {
        const prestamos = await pool.query(`
            SELECT p.prestamoid, l.libroid, l.titulo, e.edicionid, e.numero_edicion, fecha_devolucion
            FROM prestamos p, ediciones e, libros l
            WHERE miembroid = $1 AND estado = 'activo' 
            and p.edicionid = e.edicionid and e.libroid = l.libroid

        `, [id]);
        return prestamos.rows;
    } catch (error) {
        console.error('Error obteniendo los prestamos', error);
        throw error;
    }
};



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
        const result = await pool.query('SELECT u.*, m.miembroid FROM Usuario u LEFT JOIN miembros m ON u.usuarioid = m.usuarioid WHERE correo_electronico = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error buscando el usuario por email', error);
        throw error;
    }
};

const getUsers = async () => {
    try {
        const result = await pool.query('SELECT * FROM Usuario');
        return result.rows;
    } catch (error) {
        console.error('Error obteniendo los usuarios', error);
        throw error;
    }
};

const updateUserRole = async (userId, newRole) => {
    try {
        const result = await pool.query(
            'UPDATE Usuario SET rolid = $1 WHERE usuarioid = $2 RETURNING *',
            [newRole, userId]
        );
        console.log('Resultado de la actualización:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error actualizando el rol del usuario en la base de datos:', error);
        throw error;
    }
};

const updatePassword = async (id, hashedPassword) => {
    const query = 'UPDATE usuario SET contraseña = $1 WHERE usuarioid = $2';
    await pool.query(query, [hashedPassword, id]);
};

const updateName = async (userId, newName) => {
    try {
        const result = await pool.query(
            'UPDATE usuario SET nombre_usuario = $1 WHERE usuarioid = $2 RETURNING *', // Asegúrate de usar RETURNING *
            [newName, userId]
        );

        // Devuelve el usuario actualizado
        return result.rows[0]; // Asegúrate de que hay un usuario actualizado
    } catch (error) {
        console.error('Error actualizando el nombre del usuario:', error);
        throw error; // Propaga el error para manejarlo en el controlador
    }
};

const updateCorreo = async (userId, newCorreo) => {
    try {
        const result = await pool.query(
            'UPDATE usuario SET correo_electronico = $1 WHERE usuarioid = $2',
            [newCorreo, userId]
        );
        
        // Devuelve el usuario actualizado
        return result.rowCount > 0; // Retorna true si la actualización fue exitosa
    } catch (error) {
        console.error('Error actualizando el correo del usuario:', error);
        throw error; // Propaga el error para manejarlo en el controlador
    }
};


module.exports = {
    createUser,
    getUserByEmail,
    getUsers,
    updateUserRole,
    updatePassword,
    updateName,
    updateCorreo,
    getPrestamosActivos,
    setReseña
};
