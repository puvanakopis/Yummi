import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ItemDetails.css";
import { MyContext } from "../../../context/MyContext.jsx";

const ItemDetails = () => {
  const { user } = useContext(MyContext);
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCount, setCurrentCount] = useState(1);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/items/${id}`, {
          withCredentials: true,
        });
        setItem(response.data.item);
      } catch (err) {
        setError(err.message || "Error fetching item details");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handlePrev = () => {
    if (currentCount > 1) setCurrentCount(currentCount - 1);
  };

  const handleNext = () => {
    setCurrentCount(currentCount + 1);
  };


  const handleAddToCart = async () => {
    if (!user?.id) {
      alert("You must be logged in to place an order");
      return;
    }

    const orderData = {
      items: [
        {
          item: item._id,
          quantity: currentCount,
          total: item.Price * currentCount,
        },
      ],
      subtotal: item.Price * currentCount,
      deliveryFee: 100,
      grandTotal: item.Price * currentCount + 100,
    };

    try {
      setPlacingOrder(true);
      const response = await axios.post(
        `http://localhost:4000/api/orders/${user.id}`,
        orderData,
        { withCredentials: true }
      );
      console.log('ytiuych')
      alert(`Order ${response.data._id} placed successfully!`);
    } catch (err) {
      alert(err.response?.data?.message || "Error placing order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) return <p className="loading">Loading item details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!item) return <p className="error">Item not found</p>;

  return (
    <div className="ItemDetails">
      <div className="item">
        <div className="divMainHeading">
          <h1 className="MainHeading">{item.Name}</h1>
        </div>

        <div className="itemDec">
          <div className="itemDecImg w-3/7">
            <img src={`http://localhost:4000/${item.Img}`} alt={item.Name} />
          </div>

          <div className="itemDecText w-4/7">
            <div className="itemDecText1">{item.desc}</div>

            <div className="itemDecText2">
              <div className="itemDecText2-1">
                <div className="itemDecText2-1-1">Brand</div>
                <div className="itemDecText2-1-2">: {item.Brand}</div>
              </div>
              <div className="itemDecText2-1">
                <div className="itemDecText2-1-1">Flavour</div>
                <div className="itemDecText2-1-2">: {item.Flavour}</div>
              </div>
              <div className="itemDecText2-1">
                <div className="itemDecText2-1-1">Diet Type</div>
                <div className="itemDecText2-1-2">: {item.DietType}</div>
              </div>
              <div className="itemDecText2-1">
                <div className="itemDecText2-1-1">Weight</div>
                <div className="itemDecText2-1-2">: {item.Weight}</div>
              </div>
              <div className="itemDecText2-1">
                <div className="itemDecText2-1-1">Speciality</div>
                <div className="itemDecText2-1-2">: {item.Speciality}</div>
              </div>
              <div className="itemDecText2-1">
                <div className="itemDecText2-1-1">Info</div>
                <div className="itemDecText2-1-2">: {item.Info}</div>
              </div>
            </div>

            <div className="itemDecText3">
              <div className="itemDecText3-1">
                <div className="flex items-center gap-1 mt-3">
                  {"⭐".repeat(item.Rating || 5)}
                  <span className="text-sm text-gray-700">
                    ({item.Reviews || 0} Reviews)
                  </span>
                </div>
              </div>
              <div className="itemDecText3-2">Rs {item.Price}.00</div>
              <div className="itemDecText3-3">
                <div className="w-1/2">
                  <div className="ProductCard mainButton">
                    <button onClick={handlePrev}>&lt;</button>
                    <span>{currentCount}</span>
                    <button onClick={handleNext}>&gt;</button>
                  </div>
                </div>


                <div
                  className="w-full mainButton mt-2"
                  onClick={handleAddToCart}
                >
                  {placingOrder ? "Adding..." : "Add To Cart"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
