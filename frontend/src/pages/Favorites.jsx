import { useContext } from 'react';
import { MyContext } from '../Context/MyContext.jsx';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
    const { favoriteItems, toggleFavorite, isFavorite, showItem } = useContext(MyContext);
    const navigate = useNavigate();

    const navigateToItemDetails = (item) => {
        showItem(item);
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate('/ItemDetails');
    };

    return (
        <div className="FavoritesPage">
            <h2 className="MainHeading">My Favorites</h2>

            {favoriteItems.length === 0 ? (
                <p className="empty-msg">No favorite items yet!</p>
            ) : (
                <div className="favorites-grid">
                    {favoriteItems.map(item => (
                        <div key={item.id} className="favoriteItem">
                            <div className="favoriteIcon" onClick={() => toggleFavorite(item)}>
                                {isFavorite(item) ? <FaHeart color="#ea641a" /> : <FaHeart color="#fff" />}
                            </div>
                            <img src={item.Img} alt={item.Name} />
                            <div className="itemsDesc grid grid-row-2">
                                <div className="flex">
                                    <div className="name w-3/4">{item.Name}</div>
                                    <div className="rate w-1/4 flex">
                                        <FaStar color="gold" style={{ marginRight: "5px" }} />
                                        {item.Rate}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="price w-3/5">Rs {item.Price}.00</div>
                                    <button className="order w-2/5" onClick={() => navigateToItemDetails(item)}>
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
