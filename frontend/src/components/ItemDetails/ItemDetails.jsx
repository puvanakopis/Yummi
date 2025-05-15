import { useContext, useState } from "react";
import "./ItemDetails.css";
import { MyContext } from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";

const ItemDetails = () => {

    //Getting viewItem data and addToCard func
    const { viewItem, addToCard } = useContext(MyContext);



    // State for order count
    const [currentCount, setCurrentCount] = useState(1);

    const handlePrev = () => {
        if (currentCount > 1) setCurrentCount(currentCount - 1);
    };

    const handleNext = () => {
        setCurrentCount(currentCount + 1);
    };



    // Handle Add to Cart
    const handleAddToCart = () => {
        addToCard(viewItem, currentCount);
        alert(`${viewItem.Name} (Quantity: ${currentCount}) has been added to your cart!`);
    };


    
    //Navigating
    const navigate = useNavigate();
    const navigator = (path) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(path);
    };




    return (
        <div className="ItemDetails">
            <div className="item">


                {/* Item Heading */}
                <div className="divMainHeading">
                    <h1 className="MainHeading">{viewItem.Name}</h1>
                </div>

                <div className="itemDec">

                    {/* ---------------- Item Image ---------------- */}
                    <div className="itemDecImg w-3/7">
                        <img src={viewItem.Img} alt={viewItem.Name} />
                    </div>

                    {/* ---------------- Texts Description ---------------- */}
                    <div className="itemDecText w-4/7">


                        {/* Item Description */}
                        <div className="itemDecText1">{viewItem.desc}</div>



                        {/* Item category Description */}
                        <div className="itemDecText2">
                            <div className="itemDecText2-1">
                                <div className="itemDecText2-1-1">Brand</div>
                                <div className="itemDecText2-1-2">: Grandmas Kitchen</div>
                            </div>
                            <div className="itemDecText2-1">
                                <div className="itemDecText2-1-1">Flavour</div>
                                <div className="itemDecText2-1-2">: Chocolate</div>
                            </div>
                            <div className="itemDecText2-1">
                                <div className="itemDecText2-1-1">Diet Type</div>
                                <div className="itemDecText2-1-2">: Vegetarian</div>
                            </div>
                            <div className="itemDecText2-1">
                                <div className="itemDecText2-1-1">Weight</div>
                                <div className="itemDecText2-1-2">: 500ml</div>
                            </div>
                            <div className="itemDecText2-1">
                                <div className="itemDecText2-1-1">Speciality</div>
                                <div className="itemDecText2-1-2">: Low Fat, High Protein</div>
                            </div>
                            <div className="itemDecText2-1">
                                <div className="itemDecText2-1-1">Info</div>
                                <div className="itemDecText2-1-2">
                                    : No Preservatives, Gluten-Free
                                </div>
                            </div>
                        </div>



                        {/* Item Rating and Price */}
                        <div className="itemDecText3">
                            <div className="itemDecText3-1">
                                <div className="flex items-center gap-1 mt-3">
                                    {"⭐".repeat(5)}
                                    <span className="text-sm text-gray-700">(50 Reviews)</span>
                                </div>
                            </div>
                            <div className="itemDecText3-2">Rs {viewItem.Price}.00</div>
                            <div className="itemDecText3-3">
                                <div className="w-1/2">
                                    <div className="ProductCard mainButton">
                                        <button onClick={handlePrev}>
                                            &lt;
                                        </button>
                                        <span>
                                            {currentCount}
                                        </span>
                                        <button onClick={handleNext}>
                                            &gt;
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="w-1/2 mainButton" onClick={() => { handleAddToCart(); navigator('/ItemDetails')}}>
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