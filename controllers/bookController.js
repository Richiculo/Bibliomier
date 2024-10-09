const { getBooks, addBook, updateBook, deleteBook } = require('../models/bookModel');

// Controlador para buscar libros (ya implementado)
const find = async (req, res) => {
    const searchQuery = req.query.search;  // Captura el parámetro de búsqueda
    try {
        let books;
        if (searchQuery) {
            // Si hay un término de búsqueda, usa el modelo para filtrar libros
            books = await getBooks(searchQuery);
        } else {
            // Si no hay término de búsqueda, devuelve todos los libros
            books = await getBooks("");
        }
        res.json(books);
    } catch (error) {
        console.error('Error buscando libros:', error);
        res.status(500).json({ error: 'Error buscando libros' });
    }
};

// Controlador para agregar un nuevo libro
const createBook = async (req, res) => {
    const { titulo, autor, categoria, editorial, total_prestamos, promedio_rating } = req.body;

    try {
        const newBook = await addBook({ titulo, autor, categoria, editorial, total_prestamos, promedio_rating });
        res.status(201).json({ message: 'Libro agregado con éxito', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el libro', error });
    }
};

// Controlador para actualizar un libro existente
const editBook = async (req, res) => {
    const id = req.params.id;
    const { titulo, autor, categoria, editorial, total_prestamos, promedio_rating } = req.body;

    try {
        const updatedBook = await updateBook(id, { titulo, autor, categoria, editorial, total_prestamos, promedio_rating });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json({ message: 'Libro actualizado con éxito', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro', error });
    }
};

// Controlador para eliminar un libro
const removeBook = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedBook = await deleteBook(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json({ message: 'Libro eliminado con éxito', book: deletedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro', error });
    }
};

module.exports = {
    find,
    createBook,
    editBook,
    removeBook
};
