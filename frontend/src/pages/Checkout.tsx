import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
Modal.setAppElement("#root");

interface CartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
}

interface Receipt {
    name: string;
    email: string;
    total: number;
    message: string;
    timestampMs: number;
    timestampISO: string;
}

export default function Checkout() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [receipt, setReceipt] = useState<Receipt | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        const res = await axios.get("http://localhost:5000/api/cart");
        setCartItems(res.data.cart);
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/checkout", {
                name,
                email,
                cartItems,
            });
            setReceipt(res.data);
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                {!receipt ? (
                    <>
                        <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-6">
                            Checkout
                        </h2>

                        <form
                            onSubmit={handleCheckout}
                            className="space-y-4"
                            onFocus={fetchCart}
                        >
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition"
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </>
                ) : (
                    <Modal
                        isOpen={!!receipt}
                        onRequestClose={() => setReceipt(null)}
                        className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center"
                        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                            alt="Success"
                            className="w-16 h-16 mx-auto mb-3"
                        />
                        <h2 className="text-2xl font-semibold text-green-600 mb-2">
                            {receipt.message}
                        </h2>
                        <p className="text-gray-800 font-medium mb-2">
                            Name: <span className="font-normal">{receipt.name}</span>
                        </p>
                        <p className="text-gray-800 font-medium mb-2">
                            Email: <span className="font-normal">{receipt.email}</span>
                        </p>
                        <p className="text-gray-800 font-medium mb-2">
                            Total: <span className="text-indigo-600">₹{receipt.total}</span>
                        </p>
                        <p className="text-gray-600 mb-4">
                            Time:{" "}
                            {new Date(receipt.timestampMs).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>

                        <button
                            onClick={() => (window.location.href = "/")}
                            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700"
                        >
                            Back to Home
                        </button>
                    </Modal>
                )}
            </div>
        </div>
    );
}
