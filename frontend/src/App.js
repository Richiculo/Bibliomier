import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './Pages/login';
import Books from './Pages/Books';
import BookDetail from './Pages/BookDetail';
import AdminPanel from './Pages/AdminPanel';
import Register from './Pages/Register';
import ModificarCatalogo from './Pages/ModificarCatalogo';
import AdministrarUsuarios from './Pages/AdministrarUsuario';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({});
    };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetail />} />


                {isLoggedIn && user.rol === 4 && (
                    <>
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/admin/catalogo" element={<ModificarCatalogo />} />
                        <Route path="/admin/usuarios" element={<AdministrarUsuarios />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;


