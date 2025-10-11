import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { MyContext } from '../Context/MyContext.jsx';
import './Favorites.css';

const Favorites = () => {
    const { favoriteItems, toggleFavorite, isFavorite, showItem } = useContext(MyContext);
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    // Calculate pagination values
    const totalPages = Math.ceil(favoriteItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = favoriteItems.slice(startIndex, startIndex + itemsPerPage);

    // Navigate to Item Details page
    const navigateToItemDetails = (item) => {
        showItem(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/ItemDetails');
    };

    // Handle pagination navigation
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="favorites-page">
            <h2 className="MainHeading">My Favorites</h2>

            {favoriteItems.length === 0 ? (
                <p className="empty-msg">No favorite items yet!</p>
            ) : (
                <>
                    {/* ---------- Favorites Grid ---------- */}
                    <div className="favorites-grid">
                        {currentItems.map((item) => (
                            <div key={item.id} className="favoriteItem">
                                
                                {/* Favorite toggle icon */}
                                <div
                                    className="favoriteIcon"
                                    onClick={() => toggleFavorite(item)}
                                >
                                    <FaHeart color={isFavorite(item) ? "#ea641a" : "#fff"} />
                                </div>

                                {/* Item Image */}
                                <img
                                    src={item.Img}
                                    alt={item.Name}
                                    className="itemImage"
                                    onClick={() => navigateToItemDetails(item)}
                                />

                                {/* Item Details */}
                                <div className="itemsDesc grid grid-row-2">
                                    <div className="flex">
                                        <div className="name w-3/4">{item.Name}</div>
                                        <div className="rate w-1/4 flex">
                                            <FaStar color="gold" style={{ marginRight: 5 }} />
                                            {item.Rate}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="price w-3/5">Rs {item.Price}.00</div>
                                        <button
                                            className="order w-2/5"
                                            onClick={() => navigateToItemDetails(item)}
                                        >
                                            Order Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>



                    {/* ---------- Pagination Controls ---------- */}
                    <div className="pagination">
                        <button
                            className="pre"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Pre
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`pageNumber ${
                                    currentPage === index + 1 ? 'currentPage' : ''
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="next"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Favorites;