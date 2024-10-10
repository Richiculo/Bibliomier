const pool = require('../db');

// Crear una nueva categoría
const createCategoria = async ({ Nombre_Categoria, Descripcion }) => {
    try {
        const result = await pool.query(
            'INSERT INTO Categorias (Nombre_Categoria, Descripcion) VALUES ($1, $2) RETURNING *',
            [Nombre_Categoria, Descripcion]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creando la categoría', error);
        throw error;
    }
};

// Obtener todas las categorías
const getCategorias = async () => {
    try {
        const result = await pool.query('SELECT * FROM Categorias');
        return result.rows;
    } catch (error) {
        console.error('Error obteniendo las categorías', error);
        throw error;
    }
};

// Obtener una categoría por ID
const getCategoriaById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM Categorias WHERE CategoriaID = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error obteniendo la categoría por ID', error);
        throw error;
    }
};

// Actualizar una categoría
const updateCategoria = async (id, { Nombre_Categoria, Descripcion }) => {
    try {
        const result = await pool.query(
            `UPDATE Categorias SET Nombre_Categoria = $1, Descripcion = $2 WHERE CategoriaID = $3 RETURNING *`,
            [Nombre_Categoria, Descripcion, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error actualizando la categoría', error);
        throw error;
    }
};

// Eliminar una categoría
const deleteCategoria = async (id) => {
    try {
        const result = await pool.query('DELETE FROM Categorias WHERE CategoriaID = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error eliminando la categoría', error);
        throw error;
    }
};

module.exports = {
    createCategoria,
    getCategorias,
    getCategoriaById,
    updateCategoria,
    deleteCategoria
};