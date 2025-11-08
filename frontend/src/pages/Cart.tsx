import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart");
      setCart(res.data.cart);
      setTotal(res.data.total);
      localStorage.setItem("cart", JSON.stringify(res.data.cart));
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Unable to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId: number, change: number) => {
    try {
      await axios.post("http://localhost:5000/api/cart", { productId, qty: change });
      fetchCart();
    } catch (err) {
      console.error("Quantity update failed:", err);
      toast.error("Could not update quantity");
    }
  };

  const handleRemove = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    toast("Item removed", { icon: "🗑️" });
    fetchCart();
  };

  const clearCart = async () => {
    await axios.delete("http://localhost:5000/api/cart");
    toast.success("Cart cleared");
    fetchCart();
  };

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
    fetchCart();
  }, []);

  // Loading spinner
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] text-gray-700">
        <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mb-3"></div>
        <p>Loading your cart...</p>
      </div>
    );

  // Empty cart message
  if (!cart.length)
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] text-gray-600 text-center px-4">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty 🛒</h2>
        <p className="text-sm mb-5">Add something to make it happy!</p>
        <a
          href="/"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Go Shopping
        </a>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-8 text-center">
          Your Cart
        </h2>

        {/* 🧺 Cart Items */}
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={
                    item.image ||
                    `https://placehold.co/200x200?text=${encodeURIComponent(item.name)}`
                  }
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg border border-gray-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    ₹{item.price}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-lg"
                >
                  −
                </button>
                <span className="font-semibold">{item.qty}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-lg"
                >
                  +
                </button>
              </div>

              {/* Price & Remove */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-right">
                <p className="text-indigo-600 font-semibold text-lg sm:text-xl whitespace-nowrap">
                  ₹{item.price * item.qty}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🧾 Total Section */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t pt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
            Total: ₹{total}
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={clearCart}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Clear Cart
            </button>
            <a
              href="/checkout"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Checkout
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
