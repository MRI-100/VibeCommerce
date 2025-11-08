import express from "express";

const router = express.Router();

router.post("/checkout", (req, res) => {
  const { name, email, cartItems = [] } = req.body || {};

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  // ✅ Send machine-readable timestamps
  const timestampMs = Date.now();
  const timestampISO = new Date(timestampMs).toISOString();

  res.json({
    name: name || "Guest",
    email: email || "Not provided",
    total,
    message: "✅ Order placed successfully!",
    timestampMs,   // preferred for frontend formatting
    timestampISO,  // nice to have
  });
});

export default router;
