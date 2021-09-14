const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../config/database');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/users',
        }

        //Conectar a bd
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());


    }

    //declaración de rutas
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.usuarios, require('../routes/user.route'));
        // this.app.use(this.paths.categorias, require('../routes/categorias'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server in port ', this.port);
        });
    }

}

module.exports = Server;