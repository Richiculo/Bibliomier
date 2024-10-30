const express = require('express');
const cors = require('cors');
const libroRoutes = require('./routes/libroRoutes');
const autorRoutes = require('./routes/autorRoutes');
const userRoutes = require('./routes/usuarioRoutes');
const editorialRoutes = require('./routes/editorialRoutes');
const categoriaRoutes = require('./routes/categoriRoutes');
const logActivity = require('./middleware/logUserActivity');
const bitacoraRoutes = require('./routes/bitacoraRoutes');
const prestamoRoutes = require('./routes/prestamoRoutes');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

//rutas bitacora
app.use('/api', logActivity('viewed libros'), libroRoutes);
app.use('/api', logActivity('viewed autores'), autorRoutes);
app.use('/api', logActivity('viewed usuarios'), userRoutes);
app.use('/api', logActivity('viewed editoriales'), editorialRoutes);
app.use('/api', logActivity('viewed categorias'), categoriaRoutes);

// Rutas
app.use('/api', libroRoutes);
app.use('/api',autorRoutes);
app.use('/api', userRoutes);
app.use('/api', editorialRoutes);
app.use('/api', categoriaRoutes);
app.use('/api', bitacoraRoutes);
app.use('/api', prestamoRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('juany ta gozu!');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});