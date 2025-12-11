import './DeliveryInfor.css';
import { MyContext } from "../../Context/MyContext";
import { useContext, useState } from 'react';
import axios from 'axios';

const DeliveryInfor = () => {
  const { loggedInUser, cartItems, setCartItems } = useContext(MyContext);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.total || 0), 0);
  const deliveryFee = cartItems.length > 0 ? 300 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderPayload = {
      items: cartItems.map(item => ({
        item: item.item._id || item.item,
        quantity: item.quantity,
        total: item.total,
      })),
      subtotal,
      deliveryFee,
      grandTotal,
      deliveryInfo,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/api/orders/${loggedInUser.id}`,
        orderPayload,
        { withCredentials: true }
      );
      alert(response.message || "Order placed successfully!");
      setCartItems([])
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
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
              <button type="submit" className="mainButton" disabled={loading}>
                {loading ? "Placing Order..." : "Confirm Delivery"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfor;
