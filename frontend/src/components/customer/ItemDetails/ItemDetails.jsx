import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ItemDetails.css";
import { MyContext } from "../../../Context/MyContext.jsx";

const ItemDetails = () => {
    const { addToCard } = useContext(MyContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentCount, setCurrentCount] = useState(1);

    // Fetch item details
    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/items/${id}`, { withCredentials: true });
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

    const handleAddToCart = () => {
        addToCard(item, currentCount);
        alert(`${item.Name} (Quantity: ${currentCount}) has been added to your cart!`);
    };

    const navigator = (path) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(path);
    };

    if (loading) return <p className="loading">Loading item details...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!item) return <p className="error">Item not found</p>;

    return (
        <div className="ItemDetails">
            <div className="item">

                {/* Item Heading */}
                <div className="divMainHeading">
                    <h1 className="MainHeading">{item.Name}</h1>
                </div>

                <div className="itemDec">
                    {/* ---------------- Item Image ---------------- */}
                    <div className="itemDecImg w-3/7">
                        <img src={`http://localhost:4000/${item.Img}`} alt={item.Name} />
                    </div>

                    {/* ---------------- Text Description ---------------- */}
                    <div className="itemDecText w-4/7">
                        {/* Item Description */}
                        <div className="itemDecText1">{item.desc}</div>

                        {/* Item Details */}
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

                        {/* Rating, Price and Cart */}
                        <div className="itemDecText3">
                            <div className="itemDecText3-1">
                                <div className="flex items-center gap-1 mt-3">
                                    {"⭐".repeat(item.Rating || 5)}
                                    <span className="text-sm text-gray-700">({item.Reviews || 0} Reviews)</span>
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

                                <div className="w-1/2 mainButton" onClick={() => { handleAddToCart(); navigator('/ItemDetails') }}>
                                    Add To Cart
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