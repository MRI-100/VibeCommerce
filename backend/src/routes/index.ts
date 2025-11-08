import express from "express";
import productApi from "../api/product.api.js";
import orderApi from "../api/order.api.js";
import cartApi from "../api/cart.api.js";


const router = express.Router();

router.use(productApi);
router.use(orderApi);
router.use(cartApi);

export default router;
