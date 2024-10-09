import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

            <div className="space-y-4">
                {/* Links a diferentes secciones administrativas */}
                <Link to="/admin/catalogo" className="block text-blue-500 hover:underline">
                    Modificar Catálogo de Libros
                </Link>
                <Link to="/admin/usuarios" className="block text-blue-500 hover:underline">
                    Administrar Usuarios
                </Link>
            </div>
        </div>
    );
};

export default AdminPanel;
