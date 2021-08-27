const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../config/database');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Conectar a bd
        this.conectarDB();

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

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;