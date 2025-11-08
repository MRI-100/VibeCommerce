import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch cart count
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart");
        setCartCount(res.data.cart?.length || 0);
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };
    fetchCart();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-600 text-white shadow-lg z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-14 py-4 sm:py-5 lg:py-6">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide hover:text-indigo-200 transition"
        >
          Vibe<span className="text-indigo-200">Commerce</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 text-lg lg:text-xl font-medium">
          <a href="/" className="hover:text-indigo-200 transition">
            Home
          </a>

          <a href="/cart" className="relative hover:text-indigo-200 transition">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-indigo-700 text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </a>

          <a
            href="/checkout"
            className="bg-white text-indigo-700 px-5 py-2 lg:px-6 lg:py-2.5 rounded-md font-semibold hover:bg-indigo-100 transition"
          >
            Checkout
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none text-white hover:text-indigo-200 transition"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 text-white flex flex-col items-center gap-5 py-5 shadow-inner">
          <a
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-indigo-200 transition"
          >
            Home
          </a>

          <a
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="relative text-lg font-medium hover:text-indigo-200 transition"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-indigo-700 text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </a>

          <a
            href="/checkout"
            onClick={() => setMenuOpen(false)}
            className="bg-white text-indigo-700 px-6 py-2 rounded-md font-semibold hover:bg-indigo-100 transition"
          >
            Checkout
          </a>
        </div>
      )}
    </nav>
  );
}
