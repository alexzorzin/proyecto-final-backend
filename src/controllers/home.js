import logger from "../utils/logger.js";

import ProductApi from "../services/product.js";
const product = new ProductApi();

import CartApi from "../services/cart.js";
const cart = new CartApi();

import ChatApi from "../services/chat.js";
const chat = new ChatApi();

class HomeController {
    constructor() {}
    async getHome(req, res) {
        try {
            const { user, query } = req;
            if (query.statusCart) {
                cart.addCart({ userId: user._id });
            }
            const products = await product.getAll();
            const messages = await chat.getAll();
            if (products.length > 0) {
                return res.render("pages/home", {
                    title: "Product List",
                    data: products,
                    dataUser: user,
                    chat: messages
                });
            }
            return res.render("pages/home", { data: false, dataUser: user });
        } catch (error) {
            logger.warn(error);
            res.json({
                error: -1,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
}

export default HomeController;
