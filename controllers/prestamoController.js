const { crearPrestamo, registrarLibroPrestamo, obtenerPrestamos } = require('../models/prestamoModel');

// Crear un nuevo préstamo
const crearNuevoPrestamo = async (req, res) => {
    try {
        const { miembroID, edicionID, fechaPrestamo, fechaDevolucion, estado } = req.body;
        const prestamo = await crearPrestamo(miembroID, edicionID, fechaPrestamo, fechaDevolucion, estado);
        res.status(201).json(prestamo);
    } catch (error) {
        console.error('Error creando préstamo en el controlador:', error);
        res.status(500).json({ error: 'Error creando préstamo' });
    }
};

// Registrar libro en préstamo
const registrarLibro = async (req, res) => {
    try {
        const { libroID, prestamoID } = req.body;
        const libroPrestamo = await registrarLibroPrestamo(libroID, prestamoID);
        res.status(201).json(libroPrestamo);
    } catch (error) {
        console.error('Error registrando libro en préstamo en el controlador:', error);
        res.status(500).json({ error: 'Error registrando libro en préstamo' });
    }
};

// Obtener todos los préstamos
const obtenerTodosPrestamos = async (req, res) => {
    try {
        const prestamos = await obtenerPrestamos();
        res.status(200).json(prestamos);
    } catch (error) {
        console.error('Error obteniendo préstamos en el controlador:', error);
        res.status(500).json({ error: 'Error obteniendo préstamos' });
    }
};

module.exports = {
    crearNuevoPrestamo,
    registrarLibro,
    obtenerTodosPrestamos,
};
