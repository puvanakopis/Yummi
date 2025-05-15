import "./Features.css";
import { HomeFeatures } from "../../assets/assets";

const Features = () => {
  return (
    <div className="Feature">

      {/* Main heading*/}
      <div>
        <h1 className="MainHeading">Why Choose Our Food</h1>
      </div>

      {/* Features list container */}
      <div className="flex justify-center Features gap-x-25">
        
        <div className="Features-list w-1/4">
          <div>
            <img src={HomeFeatures.HF1} alt="" />
          </div>
          <h1>Freshness</h1>
          <p>
            At Yummi, we create flavorful meals using the freshest ingredients, prepared daily.
          </p>
        </div>

        <div className="Features-list w-1/4">
          <div>
            <img src={HomeFeatures.HF2} alt="" />
          </div>
          <h1>Fast Delivery</h1>
          <p>
            We deliver fresh meals quickly and reliably, always on time.
          </p>
        </div>

        <div className="Features-list w-1/4">
          <div>
            <img src={HomeFeatures.HF3} alt="" />
          </div>
          <h1>Healthy Food</h1>
          <p>
            Enjoy healthy, fresh meals made with quality ingredients for a balanced lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;