
import { Router } from "express";
import { getProducts, seedProducts } from "../api/product.api.js";

const router = Router();

router.get("/", getProducts);
router.post("/seed", seedProducts);

export default router;
