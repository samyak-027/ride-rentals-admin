import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5007/api/admin/logout', {}, { withCredentials: true });
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    }
  };

  return (
    <nav className="navbar bg-base-200 px-4 shadow-sm">
      {/* Mobile Hamburger Menu */}
      <div className="navbar-start md:hidden">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/bookings">Bookings</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <details>
                <summary>Theme</summary>
                <ul className="p-2 bg-base-300 rounded-box">
                  <li>
                    <button className="theme-controller" value="default">
                      Default
                    </button>
                  </li>
                  <li>
                    <button className="theme-controller" value="dark">
                      Dark
                    </button>
                  </li>
                  <li>
                    <button className="theme-controller" value="lemonade">
                      Lemonade
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden md:flex">
        <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
          Admin Dashboard
        </Link>
      </div>

      <div className="navbar-center hidden md:flex md:flex-1 md:justify-end">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li className="hover-bordered">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="hover-bordered">
            <Link to="/bookings">Bookings</Link>
          </li>
          <li className="hover-bordered">
            <Link to="/users">Users</Link>
          </li>
          <li>
            <div className="dropdown m-auto">
              <div tabIndex={0} role="button" className="btn m-1">
                Theme
                <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
              >
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Default"
                    value="light"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Dark"
                    value="dark"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Retro"
                    value="retro"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Cyberpunk"
                    value="cyberpunk"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Valentine"
                    value="valentine"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Lemonade"
                    value="lemonade"
                  />
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Logout Button - Always visible */}
      <div className="navbar-end">
        <button onClick={handleLogout} className="btn btn-error">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;