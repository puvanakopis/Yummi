import "./Offers.css";
import { Offer } from '../../assets/assets';

const Offers = () => {
  return (
    <div className='Offers'>

      {/* Main heading*/}
      <h1 className='MainHeading'>Featured Offers and Deals</h1>

      {/* Main container */}
      <div className='div'>

        {/* Left side - img */}
        <div className="div1 w-1/2">
          <img src={Offer.Offers1} alt="" />
        </div>

        {/* Right side - text */}
        <div className="div2 w-1/2">
          <div className='div2-1 h-3/6'>Buy 1 Pizza, <br /> Get 1 Free</div>
          <div className='div2-2 h-1/6'>Hurry! Offer Ends in 2 Hours</div>
          <div className='div2-3 mainButton h-2/6'>Browse Pizzas</div>
        </div>
      </div>
    </div>
  )
}

export default Offers;