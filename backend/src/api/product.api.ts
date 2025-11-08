import express from "express";

const router = express.Router();

// Temporary mock data with image URLs
export const Products = [
  {
    id: 1,
    name: "Action Camera",
    price: 5499,
    image:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1587202372775-98927a7f22f2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Portable Charger",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1611078489935-b03988e3a3f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Smartphone Stand",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1616628182507-cc0c87aa8c9b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Wireless Keyboard & Mouse Combo",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Noise Cancelling Headphones",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1583225476003-47e4c85d4a5b?auto=format&fit=crop&w=600&q=80",
  },
];

// GET /api/products
router.get("/products", (_, res) => {
  res.json(Products);
});

export default router;
