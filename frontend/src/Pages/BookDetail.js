import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        console.log("ID del libro:", id);
        setBook(null)
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api//libros/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error obteniendo los detalles del libro', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h1 className="text-3xl font-bold text-center mb-4">{book.titulo}</h1>
                <p className="text-lg"><strong>Autor:</strong> {book.autor}</p>
                <p className="text-lg"><strong>Género:</strong> {book.genero}</p>
                <p className="text-lg"><strong>Editorial:</strong> {book.editorial}</p>
                <p className="text-lg"><strong>Categoría:</strong> {book.categoria}</p>
            </div>
        </div>
    );
};

export default BookDetail;
