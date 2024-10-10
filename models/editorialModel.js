const pool = require('../db');

// Crear una nueva editorial
const createEditorial = async ({ Nombre_Editorial, Direccion, Contacto }) => {
    try {
        const result = await pool.query(
            'INSERT INTO Editoriales (Nombre_Editorial, Direccion, Contacto) VALUES ($1, $2, $3) RETURNING *',
            [Nombre_Editorial, Direccion, Contacto]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creando la editorial', error);
        throw error;
    }
};

// Obtener todas las editoriales
const getEditoriales = async () => {
    try {
        const result = await pool.query('SELECT * FROM Editoriales');
        return result.rows;
    } catch (error) {
        console.error('Error obteniendo las editoriales', error);
        throw error;
    }
};

// Obtener una editorial por ID
const getEditorialById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM Editoriales WHERE EditorialID = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error obteniendo la editorial por ID', error);
        throw error;
    }
};

// Actualizar una editorial
const updateEditorial = async (id, { Nombre_Editorial, Direccion, Contacto }) => {
    try {
        const result = await pool.query(
            `UPDATE Editoriales SET Nombre_Editorial = $1, Direccion = $2, Contacto = $3 WHERE EditorialID = $4 RETURNING *`,
            [Nombre_Editorial, Direccion, Contacto, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error actualizando la editorial', error);
        throw error;
    }
};

// Eliminar una editorial
const deleteEditorial = async (id) => {
    try {
        const result = await pool.query('DELETE FROM Editoriales WHERE EditorialID = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error eliminando la editorial', error);
        throw error;
    }
};

module.exports = {
    createEditorial,
    getEditoriales,
    getEditorialById,
    updateEditorial,
    deleteEditorial
};
