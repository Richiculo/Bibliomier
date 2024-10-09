import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
    const { id } = useParams(); // Obtiene el ID del libro desde la URL
    const [libro, setLibro] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLibro = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/libros/${id}`);
                setLibro(response.data);
            } catch (error) {
                setError('Error al cargar los detalles del libro');
            }
        };
        fetchLibro();
    }, [id]);

    const solicitarPrestamo = async () => {
        try {
            await axios.post(`http://localhost:3000/api/prestamos`, { libroid: id });
            alert('Préstamo solicitado con éxito');
        } catch (error) {
            alert('Error al solicitar el préstamo');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!libro) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Detalles del libro</h2>
            <p><strong>Título:</strong> {libro.titulo}</p>
            <p><strong>Género:</strong> {libro.genero}</p>
            <p><strong>Autor:</strong> {libro.autorid}</p>
            <p><strong>Editorial:</strong> {libro.editorialid}</p>
            <p><strong>Total préstamos:</strong> {libro.total_prestamos}</p>
            <p><strong>Promedio de rating:</strong> {libro.promedio_rating}</p>

            {/* Botón para solicitar el préstamo */}
            <button onClick={solicitarPrestamo} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Solicitar Préstamo
            </button>
        </div>
    );
};

export default BookDetail;

