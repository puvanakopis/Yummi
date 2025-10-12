import { useContext, useRef, useState } from 'react';
import './MenuItems.css';
import { mainMenu } from '../../../assets/assets.js';
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
    const filteredItem = mainMenu.filter((item) =>
        category === 'AllCategories' || item.ItemCategory === category
    );

    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredItem.length / itemsPerPage);

    const menuRef = useRef(null);
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItem.slice(startIndex, endIndex);

    const navigate = useNavigate();
    const { showItem, toggleFavorite, isFavorite } = useContext(MyContext);
    const navigateToItemDetails = (item) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate('/ItemDetails');
        showItem(item);
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className='CategoryMenu'>

            {/* Sidebar Toggle Button */}
            <div className='Sidebar'>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-toggle">
                    <FaBars size={24} />
                </button>
            </div>

            {/* Overlay */}
            {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

            {/* Sidebar */}
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

            {/* Items */}
            <div className="all-items">
                <div ref={menuRef} className='items'>
                    {currentItems.map((item) => (
                        <div key={item.id} className="itemsList">
                            <div className="favoriteIcon" onClick={() => toggleFavorite(item)}>
                                {isFavorite(item) ? <FaHeart color="#ea641a" /> : <FaHeart color="#ffff" />}
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

                {/* Pagination */}
                <div className="pagination">
                    <button className='pre' onClick={() => handlePageChange(currentPage - 1)}>Pre</button>
                    {[...Array(totalPages)].map((_, index) =>
                        <button key={index} onClick={() => handlePageChange(index + 1)} className={`pageNumber ${currentPage === index + 1 ? "currentPage" : ""}`}>
                            {index + 1}
                        </button>
                    )}
                    <button onClick={() => handlePageChange(currentPage + 1)} className='next'>Next</button>
                </div>
            </div>
        </div>
    );
};

export default MenuItems;
