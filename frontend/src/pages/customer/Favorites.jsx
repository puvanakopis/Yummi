import { useContext, useRef, useState } from "react";
import "./Favorites.css";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../Context/MyContext.jsx";
import LoadingPage from "../LoadingPage.jsx";

const Favorites = () => {
  const { favoriteItems, toggleFavorite, isFavorite, setViewItem, itemsLoading } =
    useContext(MyContext);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Pagination
  const totalPages = Math.ceil(favoriteItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = favoriteItems.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const navigateToItemDetails = (item) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/ItemDetails/${item._id}`);
    setViewItem(item);
  };

  if (itemsLoading) return <LoadingPage />;

  return (
    <div className="FavoritesPage">
      <h2 className="MainHeading">My Favorite Items</h2>

      {favoriteItems.length === 0 ? (
        <p className="empty-msg">No favorite items yet!</p>
      ) : (
        <>
          <div ref={menuRef} className="items">
            {currentItems.map((item) => (
              <div key={item._id} className="itemsList">
                {/* Favorite toggle */}
                <div className="favoriteIcon" onClick={() => toggleFavorite(item)}>
                  {isFavorite(item) ? (
                    <FaHeart color="#ea641a" />
                  ) : (
                    <FaHeart color="#fff" />
                  )}
                </div>

                {/* Image */}
                <img src={`http://localhost:4000/${item.Img}`} alt={item.Name} />

                {/* Description */}
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

          {/* Pagination */}
          <div className="pagination">
            <button className="pre" onClick={() => handlePageChange(currentPage - 1)}>
              Pre
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pageNumber ${
                  currentPage === index + 1 ? "currentPage" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} className="next">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;