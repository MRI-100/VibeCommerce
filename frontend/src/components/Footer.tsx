export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <p className="text-base sm:text-lg font-medium mb-3 md:mb-0">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">VibeCommerce</span>. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MRI-100"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm sm:text-base text-indigo-200 hover:text-white transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-5 h-5"
            />
            GitHub
          </a>

          <p className="hidden sm:block text-indigo-200 text-base">
            Built using React, TypeScript & Express
          </p>
        </div>
      </div>
    </footer>
  );
}
