import { useState } from "react";
import { NavLink } from "react-router-dom";
import { addToCart } from "../../redux/slices/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import phone from "../../assets/phone_1.png";
// import './Paginated.sc ss';

const Pagineted = ({ items, itemsPerPage }) => {
  const dispatch = useDispatch();
  const { query } = useSelector((store) => store.search);
  const totalPages = Math.ceil(items?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const searchedItems = query
    ? items?.filter((item) => item.title.toLowerCase().includes(query))
    : items;
  const currentItems = searchedItems?.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="main-container">
      <ul className="product-list">
        {currentItems?.length ? (
          currentItems?.map((item) => (
            <li key={item.id} className="product">
              <NavLink
                to={`/products/${item.id}`}
                className="product-link"
                initial="start"
                hover="hover"
              >
                <h2 className="product-name">{item.name}</h2>
                <img
                  src={phone}
                  alt="product"
                  className="product-image"
                  loading="lazy"
                />
              </NavLink>
              <div className="product-footer">
                <button
                  onClick={() => {
                    dispatch(addToCart(item));
                  }}
                >
                  Add to cart
                </button>
                <span className="product-price">${item.price}</span>
              </div>
            </li>
          ))
        ) : (
          <h2>No items</h2>
        )}
      </ul>

      <div className="page-numbers">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToPage(index + 1);
            }}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagineted;
