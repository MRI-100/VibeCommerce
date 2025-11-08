import express from "express";
import { Products } from "./product.api.js"; // ✅ match export name exactly

const router = express.Router();

interface CartItem {
  productId: number;
  qty: number;
}

let cart: CartItem[] = [];

// ✅ GET /api/cart — return full product info
router.get("/cart", (_, res) => {
  // Build detailed cart
  const detailedCart = cart
    .map((item) => {
      const product = Products.find((p) => p.id === item.productId);
      if (!product) return null;
      return { ...product, qty: item.qty };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null); // ✅ Type-safe filter

  // Calculate total safely
  const total = detailedCart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  res.json({ cart: detailedCart, total });
});

// ✅ POST /api/cart — add item
router.post("/cart", (req, res) => {
  const { productId, qty } = req.body;
  const existing = cart.find((i) => i.productId === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }

  res.json({ message: "Cart updated", cart });
});

// ✅ DELETE /api/cart/:id — remove item
router.delete("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((i) => i.productId !== id);
  res.json({ message: "Item removed", cart });
});

// ✅ DELETE /api/cart — clear the entire cart
router.delete("/cart", (_, res) => {
  cart = [];
  res.json({ message: "Cart cleared", cart: [] });
});

export default router;
