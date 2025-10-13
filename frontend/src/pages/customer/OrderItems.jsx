import "./OrderItems.css";
import { FiMinusCircle } from "react-icons/fi";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const OrderItem = () => {
    //Getting viewItem data and addToCard function
    const { cardItems, setCardItems } = useContext(MyContext)


    //Removing Item
    const removeItem = (itemName) => {
        const updatedItems = cardItems.filter(item => item.Name !== itemName);
        setCardItems(updatedItems);
    }

    // Calculate subtotal
    let subtotal = 0;
    for (let i = 0; i < cardItems.length; i++) {
        subtotal += cardItems[i].Price * cardItems[i].quantity;
    }

    // Add delivery fee
    let deliveryFee;
    if (cardItems.length === 0) {
        deliveryFee = 0;
    } else {
        deliveryFee = 300;
    }



    // Calculate grand total
    const grandTotal = subtotal + deliveryFee;


    //Navigating to delivery form page
    const navigate = useNavigate();
    const navigator = (path) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(path);
    };


    return (
        <div className="order-item-page">

            {/* ------------------- heading ------------------- */}
            <div className="heading">
                Order Items
            </div>

            {/* ------------------- Table ------------------- */}
            <div className="Table">

                {/* Table heading */}
                <div className="TableHeading TableScroll">
                    <div className="title w-1/6">Product</div>
                    <div className="title w-1/6">Name</div>
                    <div className="title w-1/6">Price</div>
                    <div className="title w-1/6">Quantity</div>
                    <div className="title w-1/6">Total</div>
                    <div className="title w-1/6">Action</div>
                </div>


                {/* Table items */}
                {cardItems.length > 0 ? (
                    cardItems.map((item, index) => (
                        <div key={index} className="TableItem TableScroll">
                            <div className="img w-1/6">
                                <img src={item.Img} alt={item.Name} />
                            </div>
                            <div className="desc w-1/6 font-bold">{item.Name}</div>
                            <div className="desc w-1/6">Rs {item.Price}.00</div>
                            <div className="desc w-1/6">{item.quantity}</div>
                            <div className="desc w-1/6">Rs {item.Price * item.quantity}.00</div>
                            <div className="desc w-1/6 cursor-pointer">
                                <FiMinusCircle onClick={() => removeItem(item.Name)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="TableItem NoItems">No items in cart</div>
                )}



                {/* Order summary */}
                <div className="summary top">
                    <div className=" w-1/6"></div>
                    <div className="summary_item w-1/6">Subtotal:</div>
                    <div className="w-1/6"></div>
                    <div className="w-1/6"></div>
                    <div className="w-1/6"> Rs {subtotal}.00</div>
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
                    <div className="summary_item w-1/6 font-bold">Grand Total: </div>
                    <div className="w-1/6"></div>
                    <div className="w-1/6"></div>
                    <div className="w-1/6 font-bold">Rs {grandTotal}.00</div>
                    <div className="w-1/6 "></div>
                </div>


                {/* Delivery Information */}
                <div className="checkout">
                    <div className="mainButton" onClick={() => navigator('/DeliveryInfor')}>
                        Add Delivery Address Information
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderItem;