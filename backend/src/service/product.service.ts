
import Product, { IProduct } from "../models/product.model.js";

export const getAllProducts = async (): Promise<IProduct[]> => {
  return Product.find();
};

export const seedProducts = async () => {
  const data = [
    { name: "Wireless Earbuds", price: 1499 },
    { name: "Smart Watch", price: 2999 },
    { name: "Bluetooth Speaker", price: 999 },
    { name: "Gaming Mouse", price: 799 },
    { name: "Mechanical Keyboard", price: 2499 }
  ];
  await Product.insertMany(data);
  return { message: "Products seeded!" };
};
