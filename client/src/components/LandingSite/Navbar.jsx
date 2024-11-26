import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuStyles = `flex-col absolute top-0 left-0 w-full h-full bg-gray px-10 bg-black py-40 text-5xl font-bold`;

  // Define the correct routes for each link
  const links = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Request", path: "/auth/request" },
    { name: "AdminLogin", path: "/auth/admin-login" },
    { name: "Login", path: "/auth/login" },
  ];

  return (
    <nav className="flex align-center justify-between p-10 text-white md:px-20">
      {/* Animated Logo */}
      <motion.div
        className="flex z-10 md:py-3 font-bold text-xl lg:text-4xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Link to="/" className="flex">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            className="w-8 h-8 lg:w-10 lg:h-10"
          >
            <path d="M384 352H184.36l-41 35-41-35H16v24c0 30.59 21.13 55.51 47.26 56 2.43 15.12 8.31 28.78 17.16 39.47C93.51 487.28 112.54 496 134 496h132c21.46 0 40.49-8.72 53.58-24.55 8.85-10.69 14.73-24.35 17.16-39.47 13.88-.25 26.35-7.4 35-18.63A61.26 61.26 0 00384 376zM105 320l38.33 28.19L182 320h202v-8a40.07 40.07 0 00-32-39.2c-.82-29.69-13-54.54-35.51-72C295.67 184.56 267.85 176 236 176h-72c-68.22 0-114.43 38.77-116 96.8A40.07 40.07 0 0016 312v8h89z" />
            <path d="M463.08 96h-74.59l8.92-35.66L442 45l-10-29-62 20-14.49 60H208v32h18.75l1.86 16H236c39 0 73.66 10.9 100.12 31.52A121.9 121.9 0 01371 218.07a124.16 124.16 0 0110.73 32.65 72 72 0 0127.89 90.9A96 96 0 01416 376c0 22.34-7.6 43.63-21.4 59.95a80 80 0 01-31.83 22.95 109.21 109.21 0 01-18.53 33c-1.18 1.42-2.39 2.81-3.63 4.15H416c16 0 23-8 25-23l36.4-345H496V96z" />
          </svg>
          &nbsp; FoodFolio
        </Link>
      </motion.div>

      {/* Animated Menu Links */}
      <motion.div
        className={`flex ${
          menuOpen ? mobileMenuStyles : "hidden"
        } gap-10 md:flex`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {links.map(({ name, path }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.1, color: "#2563eb" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              to={path} // Use the correct path
              className={`md:py-3 md:hover:text-blue-500 transition-all ease-linear ${
                name === "Login"
                  ? "md:bg-blue-500 md:hover:bg-blue-700 md:text-white font-bold md:text-lg md:py-3 md:px-8 md:rounded"
                  : ""
              }`}
            >
              {name}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Hamburger Menu Button with Animation */}
      <motion.div
        className="md:hidden z-10 py-1"
        onClick={() => setMenuOpen(!menuOpen)}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </motion.div>
    </nav>
  );
}

export { Navbar };
