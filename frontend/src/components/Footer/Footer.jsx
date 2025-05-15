import "./Footer.css";
import { useNavigate } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoTwitter } from "react-icons/io";
import { RiLinkedinFill } from "react-icons/ri";

const Footer = () => {

  //Navigating to pages
  const navigate = useNavigate();
  const navigator = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <div className='Footer flex items-center justify-center'>

      {/* Logo & Social Media Section */}
      <div className='f1 w-3/10 flex flex-col'>

        {/* Brand Logo */}
        <div onClick={() => navigator('/')} className="logo cursor-pointer h-1/2">
          <div className="logo-1">Yummi</div>
          <div className="logo-2">FOOD & RESTAURANT</div>
        </div>

        {/* Social Media Icons */}
        <div className="social_media flex h-1/2">
          <div className='media'><FaFacebookF /></div>
          <div className='media'><BiLogoInstagramAlt /></div>
          <div className='media'><IoLogoTwitter /></div>
          <div className='media'><RiLinkedinFill /></div>
        </div>
      </div>




      {/* Main Navigation Links */}
      <div className='f2 w-2/10'>
        <h1>Main Menu</h1>
        <ul>
          <li onClick={() => navigator('/')}>Home</li>
          <li onClick={() => navigator('/Menu')}>Menu</li>
          <li onClick={() => navigator('/About')}>About us</li>
          <li onClick={() => navigator('/Contact')}>Contact us</li>
        </ul>
      </div>

      {/* Secondary Links */}
      <div className='f3 w-2/10'>
        <h1>Useful links</h1>
        <ul>
          <li onClick={() => navigator('/addToCard')}>Orders</li>
          <li onClick={() => navigator('/login')}>Log In</li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className='f4 w-2/10'>
        <h1>Contact Us</h1>
        <ul>
          <li>yummi@gmail.com</li>
          <li>+9465 145 254 45</li>
          <li onClick={() => navigator('/')}>www.yummi.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
