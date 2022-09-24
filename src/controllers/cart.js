import logger from "../utils/logger.js";

import CartApi from "../services/cart.js";
const cart = new CartApi();

import {selectedProducts} from "./productCart.js";
import {totalPrice} from "./productCart.js";

class CartController {
    constructor() {}

    async addCart(req, res) {
        try {
            cart.addCart({ ...req.body });
            res.send("Carrito generado con éxito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async getById(req, res) {
        try {
            // logger.info(selectedProducts)
            res.render("pages/cart", { cart: selectedProducts, totalPrice: totalPrice});
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async deleteByUserId(req, res) {
        try {
            await cart.deleteByUserId(req.params.userId);
            res.send("Carrito eliminado con éxito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async emptyCart(req, res) {
        try {
            const cartUser = await cart.getById(req.params.cartId);
            cartUser.products = req.body.products;
            await cart.editById(req.params.cartId, cartUser);
            res.send("Carrito vaciado con éxito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }

    async addProductCart(req, res) {
        try {
            console.log(selectedProducts)
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
        
    }
    
    async deleteProductCart(req, res) {
        try {
            await cart.deleteProductCart(
                req.params.userId,
                req.params.productId
            );
            res.send("Producto eliminado del carrito");
        } catch (error) {
            logger.warn(error);
            res.status(404).json({
                error: -2,
                descripcion: `Ruta: ${req.url} - Método: '${req.method}' No autorizado`,
            });
        }
    }
}

export default CartController;
