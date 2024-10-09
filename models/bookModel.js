const pool = require('../db');


const getBooks = async (searchQuery) => {
    try {
        let result;
        if (searchQuery) {
            // Consulta que busca libros por título o género
            result = await pool.query(
                'SELECT * FROM Libros WHERE titulo ILIKE $1 OR genero ILIKE $1',
                [`%${searchQuery}%`]
            );
        } else {
            // Devuelve todos los libros si no hay búsqueda
            result = await pool.query('SELECT * FROM Libros');
        }
        return result.rows;
    } catch (error) {
        console.error('Error obteniendo libros:', error);
        throw error;
    }
};

// Función para agregar un nuevo libro
const addBook = async ({ titulo, autor, categoria, editorial, total_prestamos, promedio_rating }) => {
    try {
        const result = await pool.query(
            'INSERT INTO Libros (titulo, autor, categoria, editorial, total_prestamos, promedio_rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [titulo, autor, categoria, editorial, total_prestamos, promedio_rating]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error agregando el libro', error);
        throw error;
    }
};

// Función para actualizar un libro existente
const updateBook = async (id, { titulo, autor, categoria, editorial, total_prestamos, promedio_rating }) => {
    try {
        const result = await pool.query(
            'UPDATE Libros SET titulo = $1, autor = $2, categoria = $3, editorial = $4, total_prestamos = $5, promedio_rating = $6 WHERE libroID = $7 RETURNING *',
            [titulo, autor, categoria, editorial, total_prestamos, promedio_rating, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error actualizando el libro', error);
        throw error;
    }
};

// Función para eliminar un libro
const deleteBook = async (id) => {
    try {
        const result = await pool.query('DELETE FROM Libros WHERE libroID = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error eliminando el libro', error);
        throw error;
    }
};

module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
};

