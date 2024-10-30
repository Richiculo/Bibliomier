import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [user, setUser] = useState(null);  // Aquí guardaremos la información del usuario
    const [disponible, setDisponible] = useState(false); // Estado para disponibilidad del libro
    const [edicionesDisponibles, setEdicionesDisponibles] = useState([]); // Almacenar ediciones disponibles
    const [edicionSeleccionada, setEdicionSeleccionada] = useState(null);
    
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                // Obtener los detalles del libro
                const response = await axios.get(`http://localhost:3000/api/libros/${id}`);
                setBook(response.data);
                console.log('Detalles del libro:', response.data);

                // Obtener ediciones disponibles
                const edicionesResponse = await axios.get(`http://localhost:3000/api/libros/${id}/ediciones`);
                setEdicionesDisponibles(edicionesResponse.data); 

                // Verificar disponibilidad del libro
                const disponibilidadResponse = await axios.get(`http://localhost:3000/api/prestamos/${id}/disponibilidad`);
                setDisponible(disponibilidadResponse.data.disponible);
                console.log('Disponibilidad:', disponibilidadResponse.data);               
            } catch (error) {
                console.error('Error obteniendo los detalles del libro', error);
            }
        };

            //sacar los datos del usuario del token (se necesita el miembroid para poder hacer prestamo)
        const fetchUser = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token); // Decodificar el token
                setUser({ id: decodedToken.id, miembroid: decodedToken.miembroid, nombre: decodedToken.nombre, rol: decodedToken.rol, correo: decodedToken.correo });
                console.log('Usuario:', decodedToken);
            }
        };
        
        fetchBookDetails();
        fetchUser();
    }, [id]);

    const handleSolicitarPrestamo = async (edicionidSeleccionada) => {
        if (user && book && disponible) {
            try {
                await axios.post(`http://localhost:3000/api/prestamos`, {
                    id: user.id,
                    miembroid: user.miembroid,  
                    edicionid: edicionidSeleccionada, 
                    fechaDevolucion: '2024-12-31' //se puede modificar a conveniencia
                });
                alert('Préstamo solicitado con éxito');
            } catch (error) {
                console.error('Error al solicitar el préstamo:', error);
                alert('Hubo un error al solicitar el préstamo');
            }
        }
    };

    if (!book) {
        return <p>Cargando...</p>;
    }

    const handleEdicionChange = (e) => {
        setEdicionSeleccionada(e.target.value);
    };
    //nota: falta poner un controlador para que, si el usuario no es miembro salga el mensaje de que necesita ser miembro para hacer el prestamo
    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h1 className="text-3xl font-bold text-center mb-4">{book.titulo}</h1>
                <p className="text-lg"><strong>Autor:</strong> {book.autor}</p>
                <p className="text-lg"><strong>Género:</strong> {book.genero}</p>
                <p className="text-lg"><strong>Editorial:</strong> {book.editorial}</p>
                <p className="text-lg"><strong>Categoría:</strong> {book.categoria}</p>
    
                {edicionesDisponibles.length > 0 ? (
                    <div>
                        <label htmlFor="edicion">Selecciona una edición:</label>
                        <select id="edicion" onChange={handleEdicionChange}>
                            <option value="">Selecciona una edición</option>
                            {edicionesDisponibles.map((edicion) => (
                                <option key={edicion.edicionid} value={edicion.edicionid}>
                                    Edición {edicion.numero_edicion} (ISBN: {edicion.isbn})
                                </option>
                            ))}
                        </select>
    
                        {edicionSeleccionada &&  (
                            <button
                                onClick={() => handleSolicitarPrestamo(edicionSeleccionada)}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Solicitar Préstamo
                            </button>
                        )}
                    </div>
                ) : (
                    <p className="text-red-500">No hay ediciones disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
};

export default BookDetail;
