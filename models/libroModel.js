
const pool = require('../db');

// Función para crear un nuevo libro
const createLibro = async ({ Titulo, Genero, AutorID, EditorialID, CategoriaID,prestamo }) => {
    try {
        const result = await pool.query(
            'INSERT INTO libros (Titulo, Genero, AutorID, EditorialID, CategoriaID) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [Titulo, Genero, AutorID, EditorialID, CategoriaID]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creando el libro', error);
        throw error;
    }
};
const prestamo = async (userId, libroId) => {
    try {
        const result = await pool.query(
            'INSERT INTO prestamos (UsuarioID, LibroID) VALUES ($1, $2) RETURNING *',
            [userId, libroId]
        );
        return result.rows[0]; // Retornamos el libro recién creado
    } catch (error) {
        console.error('Error creando el libro', error);
        throw error;
    }
}
// Función para obtener todos los libros
const getLibros = async () => {
    try {
        const result = await pool.query('SELECT * FROM libros');
        return result.rows;
    } catch (error) {
        console.error('Error obteniendo los libros', error);
        throw error;
    }
};

const getLibrosbyid = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM libros WHERE LibroID = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error obteniendo los libros', error);
        throw error;
    }
}


// Función para obtener un libro por nombre
const getLibroByName = async (query) => {
    try {
        const result = await pool.query(
            'SELECT * FROM libros WHERE Titulo ILIKE $1',
            [`%${query}%`]
        );
        return result.rows;
    } catch (error) {
        console.error('Error obteniendo libros por criterio:', error);
        throw error;
    }
};

// Función para actualizar un libro
const updateLibro = async (id, { Titulo, Genero, AutorID, EditorialID, CategoriaID }) => {
    try {
        const result = await pool.query(
            `UPDATE Libros SET Titulo = $1, Genero = $2, AutorID = $3, EditorialID = $4, CategoriaID = $5
             WHERE LibroID = $6 RETURNING *`,
            [Titulo, Genero, AutorID, EditorialID, CategoriaID, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error actualizando el libro', error);
        throw error;
    }
};

// Función para eliminar un libro
const deleteLibro = async (id) => {
    try {
        const result = await pool.query('DELETE FROM libros WHERE LibroID = $1', [id]);
        return result.rowCount;
    } catch (error) {
        console.error('Error eliminando el libro', error);
        throw error;
    }
};

module.exports = {
    createLibro,
    getLibros,
    getLibroByName,
    updateLibro,
    deleteLibro,
    getLibrosbyid,
    prestamo
};


