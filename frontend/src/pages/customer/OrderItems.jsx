import "./OrderItems.css";
import { FiMinusCircle } from "react-icons/fi";
import { MyContext } from "../../Context/MyContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage.jsx";

const OrderItem = () => {
  const { cartLoading, cartItems,  removeItem  , updateQuantity} = useContext(MyContext);
  const navigate = useNavigate();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );
  const deliveryFee = cartItems.length > 0 ? 300 : 0;
  const grandTotal = subtotal + deliveryFee;

  const navigateToDelivery = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/DeliveryInfor");
  };

  if (cartLoading) return <LoadingPage />;

  return (
    <div className="order-item-page">
      <div className="heading">Items ({cartItems.length})</div>

      <div className="Table">
        <div className="TableHeading TableScroll">
          <div className="title w-1/6">Product</div>
          <div className="title w-1/6">Name</div>
          <div className="title w-1/6">Price</div>
          <div className="title w-1/6">Quantity</div>
          <div className="title w-1/6">Total</div>
          <div className="title w-1/6">Action</div>
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const itemData =
              typeof item.item === "object" ? item.item : { _id: item.item };
            return (
              <div key={itemData._id} className="TableItem TableScroll">
                <div className="img w-1/6">
                  <img
                    src={`http://localhost:4000/${itemData.Img || ""}`}
                    alt={itemData.Name || "Product"}
                  />
                </div>
                <div className="desc w-1/6 font-bold">
                  {itemData.Name || "Product"}
                </div>
                <div className="desc w-1/6">Rs {itemData.Price || 0}.00</div>

                <div className="desc w-1/6">
                  <div className="quantity-input-wrapper">
                    <button
                      onClick={() =>
                        updateQuantity(itemData._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      &lt;
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(itemData._id, item.quantity + 1)
                      }
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className="desc w-1/6">Rs {item.total || 0}.00</div>
                <div
                  className="desc w-1/6 cursor-pointer"
                  onClick={() => removeItem(itemData._id)}
                >
                  <FiMinusCircle />
                </div>
              </div>
            );
          })
        ) : (
          <div className="TableItem NoItems">No items in cart</div>
        )}

        <div className="summary top">
          <div className="w-1/6"></div>
          <div className="summary_item w-1/6">Subtotal:</div>
          <div className="w-1/6"></div>
          <div className="w-1/6"></div>
          <div className="w-1/6">Rs {subtotal}.00</div>
          <div className="w-1/6"></div>
        </div>

        <div className="summary">
          <div className="w-1/6"></div>
          <div className="summary_item w-1/6">Delivery Fee:</div>
          <div className="w-1/6"></div>
          <div className="w-1/6"></div>
          <div className="w-1/6">Rs {deliveryFee}.00</div>
          <div className="w-1/6"></div>
        </div>

        <div className="summary">
          <div className="w-1/6"></div>
          <div className="summary_item w-1/6 font-bold">Grand Total:</div>
          <div className="w-1/6"></div>
          <div className="w-1/6"></div>
          <div className="w-1/6 font-bold">Rs {grandTotal}.00</div>
          <div className="w-1/6"></div>
        </div>

        <div className="checkout">
          <div className="mainButton" onClick={navigateToDelivery}>
            Add Delivery Address Information
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;