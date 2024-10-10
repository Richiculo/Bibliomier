const { createCategoria, getCategorias, getCategoriaById, updateCategoria, deleteCategoria } = require('../models/categoriaModel');

const addCategoria = async (req, res) => {
    const { Nombre_Categoria, Descripcion } = req.body;
    try {
        const nuevaCategoria = await createCategoria({ Nombre_Categoria, Descripcion });
        res.status(201).json({
            message: 'Categoría creada con éxito',
            body: nuevaCategoria
        });
    } catch (error) {
        console.error('Error creando la categoría', error);
        res.status(500).json({ error: 'Error creando la categoría' });
    }
};

const getAllCategorias = async (req, res) => {
    try {
        const categorias = await getCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Error obteniendo las categorías', error);
        res.status(500).json({ error: 'Error obteniendo las categorías' });
    }
};

const getCategoriaByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await getCategoriaById(id);
        if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.status(200).json(categoria);
    } catch (error) {
        console.error('Error obteniendo la categoría', error);
        res.status(500).json({ error: 'Error obteniendo la categoría' });
    }
};

const updCategoria = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Categoria, Descripcion } = req.body;
    try {
        const categoriaActualizada = await updateCategoria(id, { Nombre_Categoria, Descripcion });
        if (!categoriaActualizada) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.status(200).json({
            message: 'Categoría actualizada con éxito',
            body: categoriaActualizada
        });
    } catch (error) {
        console.error('Error actualizando la categoría', error);
        res.status(500).json({ error: 'Error actualizando la categoría' });
    }
};

const delCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaEliminada = await deleteCategoria(id);
        if (!categoriaEliminada) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.status(200).json({
            message: 'Categoría eliminada con éxito',
            body: categoriaEliminada
        });
    } catch (error) {
        console.error('Error eliminando la categoría', error);
        res.status(500).json({ error: 'Error eliminando la categoría' });
    }
};

module.exports = {
    addCategoria,
    getAllCategorias,
    getCategoriaByIdController,
    updCategoria,
    delCategoria
};
