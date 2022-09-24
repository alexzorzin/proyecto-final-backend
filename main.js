import express from "express";
import cluster from "cluster";
import config from "./src/configs/config.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import parseArg from "minimist";
import logger from "./src/utils/logger.js";
import session from "express-session";
import passport from "passport";
import authorize from "./src/utils/authorize.js";
import ioConnect from "./src/controllers/productCart.js";
import sessionRoutes from "./src/routes/auth-routes.js";
import homeRoutes from "./src/routes/home-routes.js";
import productsRoutes from "./src/routes/product-routes.js";
import cartRoutes from "./src/routes/cart-routes.js";
import userRoutes from "./src/routes/user-routes.js";
import orderRoutes from "./src/routes/order-routes.js";
import "dotenv/config";
import { cpus } from "os";
const numCPUs = cpus().length;

const { PORT, SERVER } = parseArg(process.argv.slice(2), {
    default: { PORT: process.env.PORT || 8080, SERVER: "FORK" },
});

if (cluster.isPrimary && SERVER === "CLUSTER") {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) =>
        logger.info(`Worker ${worker.process.pid} desconectado.`)
    );
}
else {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    app.set("views", "./views");
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.static(process.cwd() + "/public"));
    app.use(session(config.configSession))
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/", sessionRoutes);
    app.use("/home", authorize, homeRoutes);
    app.use("/api/products", authorize, productsRoutes);
    app.use("/api/cart", authorize, cartRoutes);
    app.use("/api/user", authorize, userRoutes);
    app.use("/api/order", authorize, orderRoutes);

    app.use(function (req, res) {
        res.status(404).json({
            error: -2,
            descripcion: `Método '${req.method}' No implementado para la Ruta ${req.url}`
        });
    });

    io.on('connection', ioConnect);

    server.listen(PORT, async () => {
        logger.info(
            `Servidor corriendo en el puerto: ${server.address().port}`
        );
    });

    server.on("error", (error) => logger.error(`Error al iniciar el servidor: ${error}`));
}
