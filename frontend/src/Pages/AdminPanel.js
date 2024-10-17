import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h2>
                <div className="space-y-4">
                    <Link to="/admin/modificar-catalogo" className="block bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Modificar Catálogo
                    </Link>
                    <Link to="/admin/administrar-usuarios" className="block bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Administrar Usuarios
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;