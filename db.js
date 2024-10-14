
const {Pool} = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DBbiblioteca',
    password: 'pilfrutconpan',
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error adquiriendo cliente', err.stack);
    }
    console.log('Conectado a la base de datos');
    release();
});


module.exports = pool;