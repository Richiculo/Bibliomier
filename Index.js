const express = require('express');
const cors = require('cors');
const libroRoutes = require('./routes/libroRoutes');
const autorRoutes = require('./routes/autorRoutes');
const userRoutes = require('./routes/usuarioRoutes');


const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use('/api', libroRoutes);
app.use('/api',autorRoutes);
app.use('/api', userRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('juany ta gozu!');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});