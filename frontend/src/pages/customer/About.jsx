import "./About.css"
import { banner } from "../../assets/assets"
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleOrderNow = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <div className='about-page'>

      {/* -------------- Banner -------------- */}
      <div className='banner'><img src={banner.AboutBanner} alt="" /></div>

      {/* -------------- Description section -------------- */}
      <div className='desc '>
        <h1 className="MainHeading">About Us</h1>
        <div className='desc-1'>
          Founded in 2017 in Colombo, Sri Lanka, Yummi Food Shop has rapidly become a favorite among the local community. Our mission is to make it simple for customers to enjoy delicious meals and send thoughtful gifts to their loved ones. Through our innovative menu system, diners can experience a buffet-style selection, choosing one starter, one main course, and one dessert from a wide array of dishes offered by some of the top restaurants across Sri Lanka.        </div>
        <div className='desc-2'>
          Yummi Food Shop – Sharing Love, One Meal at a Time.
        </div>
        <div className='mainButton' onClick={() => handleOrderNow("/Menu")}>
          Explore Our Menu
        </div>
      </div>
    </div>
  )
}

export default About