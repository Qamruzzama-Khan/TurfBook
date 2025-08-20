import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
   <header className="flex items-center justify-between p-5 shadow-md relative sm:px-10">
  {/* Logo */}
  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
    TurfBook
  </h1>

  {/* Desktop Nav */}
  <nav>
    <ul className="hidden sm:flex items-center text-gray-600 gap-4">
      <li className="hover:bg-gradient-to-r from-green-500 to-teal-600 hover:text-white py-1 px-2 cursor-pointer rounded-lg" onClick={() => navigate("/")}>
        Home
      </li>
      {currentUser && (
        <li className="hover:bg-gradient-to-r from-green-500 to-teal-600 hover:text-white py-1 px-2 cursor-pointer rounded-lg" onClick={() => navigate("/my/bookings")}>
          My Bookings
        </li>
      )}
      {currentUser && (
        <li className="cursor-pointer" onClick={() => navigate("/profile")}>
           <FaUser className="text-3xl text-green-500 border p-1 rounded-full bg-gray-100 hover:text-green-600" />
        </li>
      )}
      {!currentUser && (
        <li className="hover:bg-gradient-to-r from-green-500 to-teal-600 hover:text-white py-1 px-3 cursor-pointer rounded-lg" onClick={() => navigate("/login")}>
          Login
        </li>
      )}
    </ul>

    {/* Mobile Hamburger */}
    <FaBars
      className="text-xl sm:hidden cursor-pointer text-gray-700 hover:text-gray-800"
      onClick={() => setIsOpen(true)}
    />
  </nav>

  {/* Side Drawer for Mobile */}
  {isOpen && (
    <div
      className="fixed inset-0 bg-gray-400/30 z-40 sm:hidden"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white w-64 h-full p-5 absolute left-0 top-0 z-50 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">TurfBook</h2>
          <IoMdClose
            className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <ul className="flex flex-col gap-3  text-gray-700">
          <li className="hover:bg-gradient-to-r from-green-500 to-teal-600 hover:text-white py-1 px-2 cursor-pointer rounded-lg" onClick={() => navigate("/");
    setIsOpen(false);}>
        Home
      </li>
          {currentUser && (
            <li className="hover:bg-gradient-to-r from-green-500 to-teal-600 hover:text-white py-1 px-2 cursor-pointer rounded-lg" onClick={() => navigate("/my/bookings");setIsOpen(false);}>
          My Bookings
        </li>
          )}
          {currentUser && (
            <li className="cursor-pointer" onClick={() => navigate("/profile");setIsOpen(false);}>
           <FaUser className="text-3xl text-green-500 border p-1 rounded-full bg-gray-100 hover:text-green-600" />
        </li>
          )}
          {!currentUser && (
            <li className="hover:bg-gradient-to-r from-green-500 to-teal-600 hover:text-white py-1 px-2 cursor-pointer rounded-lg" onClick={() => navigate("/login");setIsOpen(false);}>
          Login
        </li>
          )}
        </ul>
      </div>
    </div>
  )}
</header>
  );
};

export default Navbar;
