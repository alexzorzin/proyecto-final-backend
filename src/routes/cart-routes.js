import express from "express";
const { Router } = express;
const router = new Router();

import CartController from "../controllers/cart.js";
const controller = new CartController();

router.post("/", controller.addProductCart);
router.delete("/:userId", controller.deleteByUserId);
router.post("/:cartId", controller.emptyCart);
router.get("/:userId/products", controller.getById);
router.post("/:userId/products", controller.addProductCart);
router.delete("/:userId/products/:productId", controller.deleteProductCart);

export default router;
