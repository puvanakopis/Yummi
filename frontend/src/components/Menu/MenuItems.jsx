import { useContext, useRef, useState } from 'react';
import './MenuItems.css'
import { mainMenu } from '../../assets/assets'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {MyContext} from '../../Context/MyContext.jsx'

const MenuItems = () => {
    //Add the all category
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

    //For set the selected category
    const [category, setCategory] = useState('AllCategories')


    // Filter the items using category
    const filteredItem = mainMenu.filter((item) =>
        category === 'AllCategories' || item.ItemCategory === category)


    //Adding Page number
    const itemsPerPage = 20
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(filteredItem.length / itemsPerPage)


    //Create pages
    const menuRef = useRef(null)
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }


    //Slice the items for eath pages
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItem.slice(startIndex, endIndex);


    // Navigate 
    const navigate = useNavigate()

    
    //Sent the item to MyContext to show
    const { showItem } = useContext(MyContext);
    const navigateToItemDetails = (item) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate('/ItemDetails');
        showItem(item)
      };
    

    return (
        <div className='CategoryMenu flex'>

            {/* ----------------- Sidebar Menu ----------------- */}
            <div className="Menu w-1/5">
                <div className="table">
                    <table>
                        <tbody>
                            {categories.map((categoryName, index) => (
                                <tr key={index} onClick={() => {
                                    setCategory(categoryName);
                                    setCurrentPage(1);
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



            {/* ----------------- All items ----------------- */}

            {/* items */}
            <div className="all-items w-4/5">
                <div ref={menuRef} className='items '>
                    {currentItems.map((item) => (
                        <div key={item.id} className="itemsList">
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


                {/* Page Number */}
                <div className="pagination">
                    <button className='pre' onClick={() => handlePageChange(currentPage - 1)}>
                        Pre
                    </button >


                    {[...Array(totalPages)].map((_, index) =>
                        <button key={index} onClick={() => handlePageChange(index + 1)} className={`pageNumber ${currentPage === index + 1 ? "currentPage" : ""}`}
                        >
                            {index + 1}
                        </button>)

                    }

                    <button onClick={() => handlePageChange(currentPage + 1)} className='next'>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuItems;