import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import BookForm from './BookForm';
import GetBooksForm from './GetBooksForm';
import UpdateBookForm from './UpdateBooksForm';
import DeleteBookForm from './DeleteBooksForm';

const ModificarCatalogo = () => {
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Modificar Catálogo</h2>
            <div className="space-y-6">
                <Link to="agregar-libro" className="block w-full bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 text-center shadow-lg">
                    ➕ Agregar Libro
                </Link>
                <Link to="obtener-libros" className="block w-full bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 text-center shadow-lg">
                    📚 Obtener Libros
                </Link>
                <Link to="actualizar-libro" className="block w-full bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 text-center shadow-lg">
                    ✏️ Actualizar Libro
                </Link>
                <Link to="eliminar-libro" className="block w-full bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 text-center shadow-lg">
                    ❌ Eliminar Libro
                </Link>
            </div>

            <Routes>
                <Route path="agregar-libro" element={<BookForm />} />
                <Route path="obtener-libros" element={<GetBooksForm />} />
                <Route path="actualizar-libro" element={<UpdateBookForm />} />
                <Route path="eliminar-libro" element={<DeleteBookForm />} />
            </Routes>
        </div>
    );
};

export default ModificarCatalogo;