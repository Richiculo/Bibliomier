import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
    return (
        <div>
            <h2>Libros Disponibles</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.libroid}>
                        <Link to={`/books/${book.libroid}`}>
                            {book.titulo}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
