import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon, LogOut, User } from "lucide-react";
import { toggleTheme } from "../store/slice/themeSlice";
import { logout } from "../store/slice/authSlice";
import { useState } from "react";


const Navbar = () => {
  const { isDark } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
  const result = await dispatch(logout());
  if (logout.fulfilled.match(result)) {
    navigate("/login");
  }
};

  return (
    <nav className={`p-4 shadow-md ${isDark ? "bg-gray-800" : "bg-white"} flex justify-between`}>
      <Link to="/" className="text-xl font-bold">
        Task Manager
      </Link>

      <div className="flex items-center space-x-4">
        {/* THEME TOGGLE */}
        <button onClick={() => dispatch(toggleTheme())}>
          {isDark ? <Sun className="text-white" /> : <Moon className="text-gray-700" />}
        </button>

        {/* USER DROPDOWN */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2"
            >
              <User className={isDark ? "text-white" : "text-gray-700"} />
              <span className={isDark ? "text-white" : "text-gray-700"}>
                {user.name}
              </span>
            </button>

            {open && (
              <div
                className={`absolute right-0 mt-2 p-3 rounded-md w-40 shadow-md ${
                  isDark ? "bg-gray-700 text-white" : "bg-white"
                }`}
              >
                <Link
                  to="/profile"
                  className="block py-2 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>

                <button
                  className="flex items-center space-x-2 text-red-500 py-2"
                  onClick={handleLogout}
                >
                  <LogOut size={18} /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
