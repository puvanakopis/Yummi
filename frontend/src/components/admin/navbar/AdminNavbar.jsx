import { MdOutlineAccountCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../../context/MyContext";
import { useContext, useEffect, useState, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import './AdminNavbar.css'

const AdminNavbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { user, logout } = useContext(MyContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const accountRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="container">

        {/* ---------------- Logo ---------------- */}
        <Link to='/' className="logo">
          <div className="logo-1">Yummi</div>
          <div className="logo-2">FOOD & RESTAURANT</div>
        </Link>

        {/* ---------------- Desktop Menu ---------------- */}
        <ul className="nav-links">
          <Link to="/" className={`list ${currentPath === "/admin" ? "active" : ""}`}>Dashboard</Link>
          <Link to="/admin/users" className={`list ${currentPath === "/admin/users" ? "active" : ""}`}>Users</Link>
          <Link to="/admin/products" className={`list ${currentPath === "/admin/products" ? "active" : ""}`}>Products</Link>
          <Link to="/admin/orders" className={`list ${currentPath === "/admin/orders" ? "active" : ""}`}>Orders</Link>
        </ul>

        {/* ---------------- Right Icons ---------------- */}
        <div className="nav-icons">
          <div className="account-dropdown" ref={accountRef}>
            <div
              className="login"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
            >
              <MdOutlineAccountCircle />
            </div>
            {isAccountOpen && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <Link to="/admin/profile" className="dropdown-item">My Account</Link>
                    <span
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                        setIsAccountOpen(false);
                      }}
                    >
                      Logout
                    </span>
                  </>
                ) : (
                  <Link
                    to="/Login"
                    className="dropdown-item"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ---------------- Mobile Menu Toggle ---------------- */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </div>

        {/* ---------------- Mobile Menu ---------------- */}
        {isMenuOpen && (
          <ul className="mobile-menu">
            <Link to="/" className={`list ${currentPath === "/" ? "active" : ""}`} onClick={toggleMenu}>Home</Link>
            <Link to="/Menu" className={`list ${currentPath === "/Menu" ? "active" : ""}`} onClick={toggleMenu}>Menu</Link>
            <Link to="/About" className={`list ${currentPath === "/About" ? "active" : ""}`} onClick={toggleMenu}>About</Link>
            <Link to="/Contact" className={`list ${currentPath === "/Contact" ? "active" : ""}`} onClick={toggleMenu}>Contact</Link>
            {user ? (
              <>
                <Link to="/admin/profile" className="list" onClick={toggleMenu}>My Account</Link>
                <span className="list" onClick={() => { logout(); toggleMenu(); }}>Logout</span>
              </>
            ) : (
              <Link to="/Login" className={`list ${currentPath === "/Login" ? "active" : ""}`} onClick={toggleMenu}>Login</Link>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
