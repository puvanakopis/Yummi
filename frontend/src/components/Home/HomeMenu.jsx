import { FaStar } from "react-icons/fa";
import "./HomeMenu.css";
import { homeMenu } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from '../../Context/MyContext.jsx'

const HomeMenu = () => {

  //Sent the item to MyContext to show
  const { showItem } = useContext(MyContext);

  // Navigate to menu page
  const navigate = useNavigate()
  const navigateToItemDetails = (item) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate('/ItemDetails');
    showItem(item)
  };

  //Navigating to Menu page
  const navigator = (path) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(path);
  };

  return (
    <div className='HomeMenu'>
      {/* Main heading */}
      <div><h1 className='MainHeading'>Most Popular Items</h1></div>

      {/* items */}
      <div className='Items grid grid-cols-3 gap-4'>
        {homeMenu.map((item, index) => (

          // Menu item
          <div key={index} className='ItemList'>
            {/* Food image */}
            <img src={item.Img} alt={item.Name} />

            {/* Name and rating row */}
            <div className='naming flex flex-cols-2'>
              <div className='name w-4/5'>{item.Name}</div>
              <div className='rate w-1/5'>
                <FaStar color="gold" style={{ marginRight: "5px" }} />
                {item.Rate}
              </div>
            </div>

            {/* Price and order button */}
            <div className='naming2'>
              <div className='price'>Rs {item.Price}.00</div>
              <div className="order" onClick={() => navigateToItemDetails(item)}>Order</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation button to menu page */}
      <div className='navigate mainButton' onClick={() => navigator('/Menu')}>Menu &gt;&gt;</div>
    </div>
  );
};

export default HomeMenu;
