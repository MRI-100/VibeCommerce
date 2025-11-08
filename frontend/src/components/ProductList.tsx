import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (productId: number) => {
    try {
      await axios.post("http://localhost:5000/api/cart", { productId, qty: 1 });
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Could not add item");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <div className="animate-spin inline-block w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        <p className="text-gray-600 mt-2">Loading products...</p>
      </div>
    );
  }

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 py-10 pt-30">
      <h2 className="text-3xl md:text-4xl font-semibold text-indigo-600 text-center mb-8">
        Featured Products
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src={
                product.image ||
                `https://placehold.co/300x200?text=${encodeURIComponent(
                  product.name
                )}`
              }
              alt={product.name}
              className="w-full h-44 object-contain rounded-lg mb-3 border border-gray-100"
            />
            <h3 className="text-base sm:text-lg font-medium text-gray-800 text-center line-clamp-2">
              {product.name}
            </h3>
            <p className="text-indigo-600 font-semibold mt-1 mb-3 text-center">
              ₹{product.price}
            </p>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
