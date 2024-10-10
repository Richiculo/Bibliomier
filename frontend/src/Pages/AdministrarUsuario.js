import React from 'react';
import ListUsers from './ListUsers';
import UpdateUserForm from './UpdateUsersForm'; // Ensure this file exists
import DeleteUserForm from './DeleteUsersForm'; // Ensure this file exists

const AdministrarUsuarios = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Administrar Usuarios</h2>
            <ListUsers />
            <UpdateUserForm />
            <DeleteUserForm />
        </div>
    );
};

export default AdministrarUsuarios;
