import express from "express";

const router = express.Router();

// POST /api/checkout
router.post("/checkout", (req, res) => {
  const { name, email, cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0
  );

  const receipt = {
    name,
    email,
    total,
    timestamp: new Date().toLocaleString(),
    message: "Order placed successfully!",
  };

  res.json(receipt);
});

export default router;
