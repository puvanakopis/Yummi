import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './MenuItems.css';
import { FaStar, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../../Context/MyContext.jsx';

const MenuItems = () => {
    const categories = [
        "AllCategories",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Drinks",
        "Snacks",
        "Ice Cream",
        "Biscuits",
    ];

    const [category, setCategory] = useState('AllCategories');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { showItem, toggleFavorite, isFavorite } = useContext(MyContext);

    // Fetch items from API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:4000/api/items', { withCredentials: true });
                setItems(response.data.items || []);
            } catch (err) {
                setError(err.message || 'Error fetching items');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Filter items by category
    const filteredItems = items.filter(
        (item) => category === 'AllCategories' || item.ItemCategory === category
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    };

    const navigateToItemDetails = (item) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/ItemDetails/${item._id}`);
        showItem(item);
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className='CategoryMenu'>
            {/*  ---------------- Sidebar Toggle Button ---------------- */}
            <div className='Sidebar'>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-toggle">
                    <FaBars size={24} />
                </button>
            </div>

            {/* ---------------- Overlay ---------------- */}
            {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

            {/* ---------------- Sidebar ---------------- */}
            <div className={`Menu ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <h2>Categories</h2>
                    <button onClick={() => setSidebarOpen(false)} className="close-btn">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="table">
                    <table>
                        <tbody>
                            {categories.map((categoryName, index) => (
                                <tr key={index} onClick={() => {
                                    setCategory(categoryName);
                                    setCurrentPage(1);
                                    setSidebarOpen(false);
                                }}>
                                    <td className={`p-2 ${category === categoryName ? 'bg-[#ea641a66]' : 'bg-transparent'}`}>
                                        {categoryName}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ---------------- Items ---------------- */}
            <div className="all-items">
                {loading ? (
                    <p>Loading items...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div ref={menuRef} className='items'>
                        {currentItems.map((item) => (
                            <div key={item._id} className="itemsList">
                                <div className="favoriteIcon" onClick={() => toggleFavorite(item)}>
                                    {isFavorite(item) ? <FaHeart color="#ea641a" /> : <FaHeart color="#ffff" />}
                                </div>
                                <img src={`http://localhost:4000/${item.Img}`} alt={item.Name} />
                                <div className="itemsDesc grid grid-row-2">
                                    <div className="flex">
                                        <div className="name w-3/4">{item.Name}</div>
                                        <div className="rate w-1/4 flex">
                                            <FaStar color="gold" style={{ marginRight: "5px" }} />
                                            {item.Rating || 0}
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

                {/* ---------------- Pagination ---------------- */}
                {!loading && !error && (
                    <div className="pagination">
                        <button className='pre' onClick={() => handlePageChange(currentPage - 1)}>Pre</button>
                        {[...Array(totalPages)].map((_, index) =>
                            <button key={index} onClick={() => handlePageChange(index + 1)} className={`pageNumber ${currentPage === index + 1 ? "currentPage" : ""}`}>
                                {index + 1}
                            </button>
                        )}
                        <button onClick={() => handlePageChange(currentPage + 1)} className='next'>Next</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuItems;