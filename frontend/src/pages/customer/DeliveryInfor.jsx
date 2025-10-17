import './DeliveryInfor.css';
import { MyContext } from "../../Context/MyContext";
import { useContext, useState } from 'react';

const DeliveryInfor = () => {
  const {  placeOrder } = useContext(MyContext);

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await placeOrder(deliveryInfo);
  };

  return (
    <div className='delivery-infor-page'>
      <div className="container">
        <h2 className="title MainHeading">Delivery Information</h2>
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className='input_details'>
              <div className='FName'>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={deliveryInfo.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="LName">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={deliveryInfo.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='Address'>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={deliveryInfo.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Postal_Code">
                <input
                  type="text"
                  id="postalCode"
                  placeholder="Postal Code"
                  value={deliveryInfo.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="Phone_Number">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  value={deliveryInfo.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='button'>
              <button type="submit" className="mainButton">
                Delivery Confirmed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfor;
