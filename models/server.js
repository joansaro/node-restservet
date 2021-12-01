const express = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middleware
        this.middlewares();
        // Rutas de mi aplicacion

        this.route();
    }

    middlewares(){
        // CORS
        this.app.use(cors())

        // Lectura y parceo del body
        this.app.use(express.json())

        // Directorio publico
        this.app.use( express.static('public'));
    }

    route(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerta', this.port);
        })
    }

}


module.exports = Server;