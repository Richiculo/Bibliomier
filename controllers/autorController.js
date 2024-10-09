
const { createAutor, getAutores, getAutorById, updateAutor, deleteAutor } = require('../models/autorModel');


const addAutor = async (req, res) => {
    const { Nombre, Biografia, Nacionalidad } = req.body;
    try {
        const nuevoAutor = await createAutor({ Nombre, Biografia, Nacionalidad });
        res.status(201).json({
            message: 'Autor agregado con éxito',
            body: nuevoAutor
        });
    } catch (error) {
        console.error('Error agregando el autor', error);
        res.status(500).json({ error: 'Error agregando el autor' });
    }
};


const getAutor = async (req, res) => {
    try {
        const autores = await getAutores();
        if (!autores) {
            return res.status(404).json({ message: 'No se encontraron autores' });
        }
        res.status(200).json(autores);
    } catch (error) {
        console.error('Error obteniendo los autores', error);
        res.status(500).json({ error: 'Error obteniendo los autores' });
    }
};


const getAutorByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const autor = await getAutorById(id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.status(200).json(autor);
    } catch (error) {
        console.error('Error obteniendo el autor por ID', error);
        res.status(500).json({ error: 'Error obteniendo el autor por ID' });
    }
};


const updAutor = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Biografia, Nacionalidad } = req.body;
    try {
        const autorActualizado = await updateAutor(id, { Nombre, Biografia, Nacionalidad });
        if (!autorActualizado) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.status(200).json({
            message: 'Autor actualizado con éxito',
            body: autorActualizado
        });
    } catch (error) {
        console.error('Error actualizando el autor', error);
        res.status(500).json({ error: 'Error actualizando el autor' });
    }
};


const delAutor = async (req, res) => {
    const { id } = req.params;
    try {
        const autorEliminado = await deleteAutor(id);
        if (!autorEliminado) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.status(200).json({
            message: 'Autor eliminado con éxito',
            body: autorEliminado
        });
    } catch (error) {
        console.error('Error eliminando el autor', error);
        res.status(500).json({ error: 'Error eliminando el autor' });
    }
};

module.exports = {
    addAutor,
    getAutor,
    getAutorByIdController,
    updAutor,
    delAutor
};

    getAutorByIdController,
    updAutor,
    delAutor
};
