import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link to navigate to BookDetail

const Books = () => {
    const [books, setLibros] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Function to fetch books based on the search query
    const fetchLibros = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/search?search=${searchQuery}`);
            setLibros(response.data);
        } catch (error) {
            console.error('Error obteniendo los libros:', error);
        }
    };
    const handleSearch = () => {
        fetchLibros(searchQuery);
    };

    return (
        <div>
            <h2>Libros Disponibles</h2>
            <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                placeholder="Buscar libro"
            />
            <button onClick={handleSearch}>Buscar</button>

            <ul>
                {books.map((book) => (
                    <li key={book.libroid}>
                        <Link to={`/libros/${book.libroid}`}>{book.titulo}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Books;
