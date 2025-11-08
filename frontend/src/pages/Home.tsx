import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-10 px-4">
        <div className="text-center md:text-left md:w-1/2 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-600 leading-tight">
            Discover Tech You’ll Love
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Explore top-quality gadgets and accessories at unbeatable prices.
          </p>
          <a
            href="#products"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Start Shopping
          </a>
        </div>

        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Shopping Illustration"
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </div>
      </section>

      <ProductList />
    </main>
  );
}
