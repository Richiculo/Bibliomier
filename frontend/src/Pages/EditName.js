import React, { useState } from 'react';
import axios from 'axios';

const EditName = ({ user, setUser }) => {
    const [nombre, setNombre] = useState(user.nombre);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Actualizando nombre para el usuario con ID:', user.id); // Verifica el ID
            console.log('Nombre a actualizar:', nombre); // Verifica el nombre
            await axios.put(`http://localhost:3000/api/users/name/${user.id}`, { nombre });
            setMessage('Nombre de Usuario actualizado exitosamente.');
        } catch (error) {
            console.error('Error actualizando el nombre:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Escribe tu nombre"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
            {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
        </form>
    );
};

export default EditName;
