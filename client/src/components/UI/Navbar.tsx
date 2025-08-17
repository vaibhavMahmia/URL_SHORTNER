import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../store";
import { logoutThunkAction } from "../../store/reducers/auth_reducer";
import { Loader2 } from "lucide-react";

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.URIShortner);

  return (
    <div className="navbar text-gray-200 w-full h-5 px-3 rounded-lg shadow-md bg-gray-700/60 backdrop-blur-lg">
      {/* Left side */}
      <div className="navbar-start gap-2">
        {/* Mobile menu */}
        {user && (
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-lg z-10 mt-3 w-52 p-2 shadow bg-gray-800/80 backdrop-blur-lg"
            >
              <li className="font-bold text-gray-200">
                <Link to={"/profile"}>
                  <FaCircleUser className="text-teal-400" />
                  {user.name}
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Logo */}
        <Link
          to={"/"}
          className="text-lg font-extrabold flex items-center gap-1 bg-teal-700 text-white px-2 py-1 rounded-lg"
        >
          <span className="bg-white text-teal-700 px-2 py-1 rounded-lg">
            NaNo
          </span>
          URI
        </Link>
      </div>

      {/* Center (desktop profile link) */}
      {user && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to={"/profile"}
                className="flex items-center gap-2 text-white/90 hover:text-teal-400 transition font-semibold"
              >
                <FaCircleUser className="text-teal-400 text-lg" />
                {user.name}
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Right side (auth actions) */}
      <div className="navbar-end">
        {user ? (
          <button
            onClick={() => dispatch(logoutThunkAction())}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FaSignOutAlt className="w-4 h-4" />
            )}
            {loading ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <Link
            to="/signin"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition"
          >
            <FaCircleUser className="w-4 h-4" />
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};
