import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import GetAllUsuarios from './GetAllUsuarios';
import AdministrarRoles from './AdministrarRoles';
import Bitacora from '../components/Bitacora';

const AdministrarUsuarios = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Administrar Usuarios</h2>
                <div className="space-y-4">
                    <Link to="getall-usuarios" className="block bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Ver Todos los Usuarios
                    </Link>
                    <Link to="administrar-roles" className="block bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Administrar Roles
                    </Link>
                    <Link to="bitacora" className="block bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
                        Ver Bitácora
                    </Link>
                </div>

                <Routes>
                    <Route path="getall-usuarios" element={<GetAllUsuarios />} />
                    <Route path="administrar-roles" element={<AdministrarRoles />} />
                    <Route path="bitacora" element={<Bitacora />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdministrarUsuarios;
