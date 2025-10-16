import './DeliveryInfor.css';
import { MyContext } from "../../context/MyContext";
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeliveryInfor = () => {
  const { user, cartItems, setCartItems } = useContext(MyContext);
  const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    setDeliveryInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user || !user.id) {
        alert("Please log in before placing an order.");
        return;
      }

      if (!cartItems || cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
      const deliveryFee = 300;
      const grandTotal = subtotal + deliveryFee;

      const items = cartItems.map((item) => ({
        item: item._id,
        quantity: item.quantity,
        total: item.total,
      }));

      const orderData = {
        items,
        subtotal,
        deliveryFee,
        grandTotal,
        deliveryInfo,
      };

      const response = await axios.post(
        `http://localhost:4000/api/orders/${user.id}`,
        orderData
      );

      if (response.status === 201) {
        await axios.delete("http://localhost:4000/api/cart/delete-all", {
          data: { userId: user.id },
        });
        setCartItems([]);

        alert("Your order has been placed successfully!");
        navigate("/");
      } else {
        alert("Something went wrong while placing the order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again later.");
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