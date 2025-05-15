import { MdFavoriteBorder } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { MyContext } from "../../Context/MyContext";
import { useContext, useEffect, useState } from "react";
const Navbar = () => {

  const location = useLocation()
  const currentParth = location.pathname


  
  // Up dating the Count of Add to Card
  const { cardItems } = useContext(MyContext);
  const [numberOfItem, setNumberOfItem] = useState(0);

  useEffect(() => {
    setNumberOfItem(cardItems.length);
  }, [cardItems]);



  return (
    <div className="navbar">

      {/* Left section of the navbar */}
      <div className="first">

        {/* Logo  */}
        <Link to={'/'}  className="logo w-1/5">
          <div className="logo-1">Yummi</div>
          <div className="logo-2">FOOD & RESTAURANT</div>
        </Link>

        {/* Search bar */}
        <div className="search-bar">
          <div>
            <input type="text" placeholder="Search for products, categories or brands..." />
          </div>
        </div>

        {/* Favorite/Wishlist icon */}
        <div className="like-item">
          <MdFavoriteBorder />
          <div className="dot">0</div>
        </div>

        {/* Shopping bag icon */}
        <Link to='addToCard' className="order-item">
          <LiaShoppingBagSolid />
          <div className="dot">{numberOfItem}</div>
        </Link>

        {/* User account icon */}
        <div className="login">
          <Link className="image" to={"Login"}><MdOutlineAccountCircle /></Link>
        </div>
      </div>



      {/* Right section of the navbar */}
      <div className="last">
        <ul>
          <Link to="/" className={`list ${currentParth === "/" ? "active" : ""}`}>Home</Link>
          <Link to="/Menu" className={`list ${currentParth === "/Menu" ? "active" : ""}`}>Menu</Link>
          <Link to="/About" className={`list ${currentParth === "/About" ? "active" : ""}`}>About</Link>
          <Link to="/Contact" className={`list ${currentParth === "/Contact" ? "active" : ""}`}>Contact</Link>

        </ul>
      </div>
    </div>
  );
};

export default Navbar;
