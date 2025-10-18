import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ItemDetails.css";
import { MyContext } from "../../Context/MyContext.jsx";
import LoadingPage from "../LoadingPage.jsx";

const ItemDetails = () => {
  const { loggedInUser, loading, setLoading } = useContext(MyContext);
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [currentCount, setCurrentCount] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/items/${id}`,
          { withCredentials: true }
        );
        setItem(response.data.item);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching item details");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, setLoading]);

  const handlePrev = () => {
    if (currentCount > 1) setCurrentCount(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrentCount(prev => prev + 1);
  };

  const handleAddToCart = async () => {
    if (!loggedInUser?.id) {
      alert("You must be logged in to add items to the cart");
      return;
    }

    const cartData = {
      userId: loggedInUser.id,
      items: [
        {
          itemId: item._id,
          quantity: currentCount,
        },
      ],
    };

    try {
      setAddingToCart(true);
      const response = await axios.post(
        `http://localhost:4000/api/cart/add`,
        cartData,
        { withCredentials: true }
      );
      alert("Item added to cart successfully!");
      console.log(response.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error adding item to cart");
      console.error(err);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <p className="error">Error: {error}</p>;
  if (!item) return <p className="error">Item not found</p>;

  const ratingStars = "⭐".repeat(item.Rating || 5);

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
            <p className="itemDecText1">{item.desc}</p>

            <div className="itemDecText2">
              {[
                { label: "Brand", value: item.Brand },
                { label: "Flavour", value: item.Flavour },
                { label: "Diet Type", value: item.DietType },
                { label: "Weight", value: item.Weight },
                { label: "Speciality", value: item.Speciality },
                { label: "Info", value: item.Info },
              ].map((field, idx) => (
                <div className="itemDecText2-1" key={idx}>
                  <div className="itemDecText2-1-1">{field.label}</div>
                  <div className="itemDecText2-1-2">: {field.value || "-"}</div>
                </div>
              ))}
            </div>

            <div className="itemDecText3">
              <div className="itemDecText3-1">
                <div className="flex items-center gap-1 mt-3">
                  {ratingStars}
                  <span className="text-sm text-gray-700">
                    ({item.Reviews || 0} Reviews)
                  </span>
                </div>
              </div>

              <div className="itemDecText3-2">Rs {item.Price}.00</div>

              <div className="itemDecText3-3">
                <div className="w-1/2">
                  <div className="ProductCard mainButton">
                    <button onClick={handlePrev} disabled={currentCount <= 1}> &lt;</button>
                    <span>{currentCount}</span>
                    <button onClick={handleNext}>&gt;</button>
                  </div>
                </div>

                <div className="w-full mt-2">
                  <button
                    className="mainButton w-full"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                  >
                    {addingToCart ? "Adding..." : "Add To Cart"}
                  </button>
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