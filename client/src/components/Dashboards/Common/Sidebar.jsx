import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      for: PropTypes.string.isRequired,
      svg: PropTypes.element.isRequired,
    })
  ).isRequired,
};

function Sidebar({ links }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => window.removeEventListener("resize", setWindowDimensions);
  }, []);

  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <button
        className={`fixed flex gap-2 md:hidden z-50 top-[6rem] left-20 md:left-20 ml-10 bg-black p-1 w-50 h-50 rounded-full shadow-lg text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-20" : "-translate-x-20"
        }`}
        onClick={toggleMenu}
      >
        <svg
          className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
        <svg
          className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className={`flex flex-col justify-between h-screen w-screen absolute md:static sm:w-64 bg-black text-white transition-transform duration-300 ease-in-out z-40 transform ${
          isOpen ? "translate-x-0" : "absolute -translate-x-full"
        }`}
      >
        <Link
          to={`/${links[0].for}-dashboard`}
          className="py-4 px-4 md:py-5 lg:py-4 gap-2 bg-blue-700 flex items-center text-2xl"
        >
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M368 128h.09M479.55 96h-91.06l8.92-35.66 38.32-13.05c8.15-2.77 13-11.43 10.65-19.71a16 16 0 00-20.54-10.73l-47 16a16 16 0 00-10.36 11.27L355.51 96H224.45c-8.61 0-16 6.62-16.43 15.23A16 16 0 00224 128h2.75l1 8.66A8.3 8.3 0 00236 144c39 0 73.66 10.9 100.12 31.52A121.9 121.9 0 01371 218.07a123.4 123.4 0 0110.12 29.51 7.83 7.83 0 003.29 4.88 72 72 0 0126.38 86.43 7.92 7.92 0 00-.15 5.53A96 96 0 01416 376c0 22.34-7.6 43.63-21.4 59.95a80.12 80.12 0 01-28.78 21.67 8 8 0 00-4.21 4.37 108.19 108.19 0 01-17.37 29.86 2.5 2.5 0 001.9 4.11h49.21a48.22 48.22 0 0047.85-44.14L477.4 128h2.6a16 16 0 0016-16.77c-.42-8.61-7.84-15.23-16.45-15.23z" />
            <path d="M108.69 320a23.87 23.87 0 0117 7l15.51 15.51a4 4 0 005.66 0L162.34 327a23.87 23.87 0 0117-7h196.58a8 8 0 008.08-7.92V312a40.07 40.07 0 00-32-39.2c-.82-29.69-13-54.54-35.51-72C295.67 184.56 267.85 176 236 176h-72c-68.22 0-114.43 38.77-116 96.8A40.07 40.07 0 0016 312a8 8 0 008 8zM185.94 352a8 8 0 00-5.66 2.34l-22.14 22.15a20 20 0 01-28.28 0l-22.14-22.15a8 8 0 00-5.66-2.34h-69.4a15.93 15.93 0 00-15.76 13.17A65.22 65.22 0 0016 376c0 30.59 21.13 55.51 47.26 56 2.43 15.12 8.31 28.78 17.16 39.47C93.51 487.28 112.54 496 134 496h132c21.46 0 40.49-8.72 53.58-24.55 8.85-10.69 14.73-24.35 17.16-39.47 26.13-.47 47.26-25.39 47.26-56a65.22 65.22 0 00-.9-10.83A15.93 15.93 0 00367.34 352z" />
          </svg>{" "}
          <span className="md:hidden lg:inline">Dashboard</span>
        </Link>
        <div className="flex flex-col space-y-1 text-2xl text-white">
          {links.map((link) => (
            <Link
              to={link.url}
              key={link.text}
              className={`py-2 px-4 flex items-center gap-2 ${
                location.pathname === link.url
                  ? "text-blue-500"
                  : "hover:text-blue-500"
              }`}
            >
              {link.svg}
              {link.text}
            </Link>
          ))}
        </div>
        <div className="p-4">
          <button
            onClick={logout}
            type="submit"
            className="w-full flex gap-2 justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
