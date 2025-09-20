import { MdFavoriteBorder } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../Context/MyContext";
import { useContext, useEffect, useState, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import './Navbar.css'

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { cardItems, user, logout } = useContext(MyContext);
  const [numberOfItem, setNumberOfItem] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const accountRef = useRef(null);

  useEffect(() => {
    setNumberOfItem(cardItems.length);
  }, [cardItems]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close account dropdown when clicking outside
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
      <div className="navbar-container">

        {/* ---------------- Logo ---------------- */}
        <Link to='/' className="logo">
          <div className="logo-1">Yummi</div>
          <div className="logo-2">FOOD & RESTAURANT</div>
        </Link>

        {/* ---------------- Desktop Menu ---------------- */}
        <ul className="nav-links">
          <Link to="/" className={`list ${currentPath === "/" ? "active" : ""}`}>Home</Link>
          <Link to="/Menu" className={`list ${currentPath === "/Menu" ? "active" : ""}`}>Menu</Link>
          <Link to="/About" className={`list ${currentPath === "/About" ? "active" : ""}`}>About</Link>
          <Link to="/Contact" className={`list ${currentPath === "/Contact" ? "active" : ""}`}>Contact</Link>
        </ul>

        {/* ---------------- Right Icons ---------------- */}
        <div className="nav-icons">
          <div className="like-item">
            <MdFavoriteBorder />
            <div className="dot">0</div>
          </div>

          <Link to='/addToCard' className="order-item">
            <LiaShoppingBagSolid />
            <div className="dot">{numberOfItem}</div>
          </Link>

          {/* -------- Account Dropdown -------- */}
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
                    <span className="dropdown-item">My Account</span>
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
            <Link to="/Favorite" className={`list ${currentPath === "/Favorite" ? "active" : ""}`} onClick={toggleMenu}>Favorite</Link>
            {user ? (
              <>
                <span className="list" onClick={toggleMenu}>My Account</span>
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

export default Navbar;
