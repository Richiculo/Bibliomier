import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdministrarRoles = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/users')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }, []);

    const handleUpdateRole = (userId, newRole) => {
        if (!newRole) {
            alert('Por favor, selecciona un rol.');
            return;
        }

        axios.put('http://localhost:3000/api/users/update', { userId, newRole })
            .then((response) => {
                alert('Rol actualizado exitosamente');
                setUsuarios((prev) =>
                    prev.map((user) =>
                        user.usuarioid === userId ? { ...user, rolid: newRole } : user
                    )
                );
            })
            .catch((error) => {
                console.error('Error al actualizar rol:', error);
                alert('Error al actualizar el rol');
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Administrar Roles</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b-2 border-gray-300 p-2 text-left">ID</th>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Nombre</th>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Correo</th>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Rol ID</th>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Rol</th>
                            <th className="border-b-2 border-gray-300 p-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.usuarioid} className="border-t">
                                <td className="p-2">{usuario.usuarioid}</td>
                                <td className="p-2">{usuario.nombre_usuario}</td>
                                <td className="p-2">{usuario.correo_electronico}</td>
                                <td className="p-2">{usuario.rolid}</td>
                                <td className="p-2">
                                    <select
                                        value={usuario.newRole || usuario.rolid}
                                        onChange={(e) => {
                                            const updatedUsuarios = usuarios.map((u) =>
                                                u.usuarioid === usuario.usuarioid
                                                    ? { ...u, newRole: e.target.value }
                                                    : u
                                            );
                                            setUsuarios(updatedUsuarios);
                                        }}
                                        className="p-2 border rounded"
                                    >
                                        <option value="">Seleccionar rol</option>
                                        <option value="1">Usuario</option>
                                        <option value="2">Miembro</option>
                                        <option value="3">Empleado</option>
                                        <option value="4">Administrador</option>
                                    </select>
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleUpdateRole(usuario.usuarioid, usuario.newRole || usuario.rolid)}
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                    >
                                        Actualizar Rol
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdministrarRoles;