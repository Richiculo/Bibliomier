import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditPassword = ({ user }) => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    console.log("User en EditPassword:", user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            alert("El usuario no está definido correctamente.");
            return;
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        try {
            await axios.put(`http://localhost:3000/api/users/${user.id}`, { password });
            alert("Contraseña actualizada con éxito");
            navigate('/');  // Redirigir a la página principal

            setPassword('');
        } catch (error) {
            console.error('Error actualizando la contraseña:', error);
            alert("Hubo un problema al actualizar la contraseña");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
                <input
                    className="block w-full p-2 border border-gray-300 rounded"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Escribe tu nueva contraseña"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">Actualizar</button>
        </form>
    );
};

export default EditPassword;