const { createEditorial, getEditoriales, getEditorialById, updateEditorial, deleteEditorial } = require('../models/editorialModel');

const addEditorial = async (req, res) => {
    const { Nombre_Editorial, Direccion, Contacto } = req.body;
    try {
        const nuevaEditorial = await createEditorial({ Nombre_Editorial, Direccion, Contacto });
        res.status(201).json({
            message: 'Editorial creada con éxito',
            body: nuevaEditorial
        });
    } catch (error) {
        console.error('Error creando la editorial', error);
        res.status(500).json({ error: 'Error creando la editorial' });
    }
};

const getAllEditoriales = async (req, res) => {
    try {
        const editoriales = await getEditoriales();
        res.status(200).json(editoriales);
    } catch (error) {
        console.error('Error obteniendo las editoriales', error);
        res.status(500).json({ error: 'Error obteniendo las editoriales' });
    }
};

const getEditorialByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const editorial = await getEditorialById(id);
        if (!editorial) return res.status(404).json({ error: 'Editorial no encontrada' });
        res.status(200).json(editorial);
    } catch (error) {
        console.error('Error obteniendo la editorial', error);
        res.status(500).json({ error: 'Error obteniendo la editorial' });
    }
};

const updEditorial = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Editorial, Direccion, Contacto } = req.body;
    try {
        const editorialActualizada = await updateEditorial(id, { Nombre_Editorial, Direccion, Contacto });
        if (!editorialActualizada) return res.status(404).json({ error: 'Editorial no encontrada' });
        res.status(200).json({
            message: 'Editorial actualizada con éxito',
            body: editorialActualizada
        });
    } catch (error) {
        console.error('Error actualizando la editorial', error);
        res.status(500).json({ error: 'Error actualizando la editorial' });
    }
};

const delEditorial = async (req, res) => {
    const { id } = req.params;
    try {
        const editorialEliminada = await deleteEditorial(id);
        if (!editorialEliminada) return res.status(404).json({ error: 'Editorial no encontrada' });
        res.status(200).json({
            message: 'Editorial eliminada con éxito',
            body: editorialEliminada
        });
    } catch (error) {
        console.error('Error eliminando la editorial', error);
        res.status(500).json({ error: 'Error eliminando la editorial' });
    }
};

module.exports = {
    addEditorial,
    getAllEditoriales,
    getEditorialByIdController,
    updEditorial,
    delEditorial
};
