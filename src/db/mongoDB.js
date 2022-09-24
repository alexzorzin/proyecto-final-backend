import mongoose from "mongoose";
import config from "../configs/config.js";

import logger from "../utils/logger.js";

class MongoDBClient {
    constructor() {
        this.connected = false;
        this.client = mongoose;
    }

    connect() {
        try {
            this.client.connect(config.mongoDB.cnx, config.mongoDB.options);
            logger.info("se ha conectado la base de datos");
        } catch (error) {
            logger.error(
                `ERROR AL CONECTAR DB: ${error}`
            );
            throw "MongoDB no se ha conectado correctamente";
        }
    }

    async disconnect() {
        try {
            await this.client.close();
            logger.info("se ha desconectado la base de datos");
        } catch (error) {
            logger.error(`ERROR EN LA DESCONEXION: ${error}`);
            throw "MongoDB no se ha podido desconectar";
        }
    }
}

export default MongoDBClient;
