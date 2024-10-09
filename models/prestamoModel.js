const pool = require('../db');

// Crear nuevo préstamo
const crearPrestamo = async (miembroID, edicionID, fechaPrestamo, fechaDevolucion, estado) => {
    try {
        const result = await pool.query(
            `INSERT INTO Prestamos (MiembroID, EdicionID, Fecha_Prestamo, Fecha_Devolucion, Estado) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [miembroID, edicionID, fechaPrestamo, fechaDevolucion, estado]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creando préstamo en el modelo:', error);
        throw error;
    }
};

// Relacionar un libro específico con un préstamo
const registrarLibroPrestamo = async (libroID, prestamoID) => {
    try {
        const result = await pool.query(
            `INSERT INTO LibroPrestamo (LibroID, PrestamoID) VALUES ($1, $2) RETURNING *`,
            [libroID, prestamoID]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error registrando libro en préstamo en el modelo:', error);
        throw error;
    }
};

// Obtener todos los préstamos
const obtenerPrestamos = async () => {
    try {
        const result = await pool.query('SELECT * FROM Prestamos');
        return result.rows;
    } catch (error) {
        console.error('Error obteniendo préstamos en el modelo:', error);
        throw error;
    }
};

module.exports = {
    crearPrestamo,
    registrarLibroPrestamo,
    obtenerPrestamos,
};
