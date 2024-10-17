import React, { useState } from 'react';
import axios from 'axios';

const EditEmail = ({ user }) => {
    const [correo, setCorreo] = useState(user.correo);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/users/correo/${user.id}`, { correo });
            setMessage('Correo actualizado exitosamente.');
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Correo:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Escribe tu correo"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
            {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
        </form>
    );
};

export default EditEmail;