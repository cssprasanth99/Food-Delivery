import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const data = useContext(UserContext);

  // Subscribing to the store using a selection
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-pink-100 to-pink-200 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={LOGO_URL}
          alt="Food Logo"
          className="w-16 h-16 object-contain"
        />
        <span className="text-xl font-bold text-pink-700">FoodiesHub</span>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="flex items-center gap-6 text-base font-medium text-gray-700">
          <li>Online: {onlineStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/" className="hover:text-pink-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-pink-600 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-pink-600 transition">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/grocery" className="hover:text-pink-600 transition">
              Grocery
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="font-bold text-xl hover:text-pink-600 transition"
            >
              Cart ({cartItems.length} items)
            </Link>
          </li>
          <li>
            <button
              onClick={() =>
                setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login")
              }
              className="px-4 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition"
            >
              {btnNameReact}
            </button>
          </li>
          <li className="hover:text-pink-600 transition">
            {data.loggedInUser}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
