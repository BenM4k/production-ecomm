import { NavLink } from "react-router-dom";
import { addToCart } from "../../redux/slices/users/userSlice";
import { useDispatch } from "react-redux";
import phone from "../../assets/phone_1.png";

const Pagineted = ({
  items,
  itemsPerPage,
  total,
  page,
  setCurrentPage,
  isError,
  isLoading,
  searchItem,
}) => {
  const dispatch = useDispatch();
  const totalPages = Math.ceil(total / itemsPerPage);

  const searchedProducts = searchItem
    ? items.filter((item) => item.name.toLowerCase().includes(searchItem))
    : items;

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  if (isError)
    return (
      <div>
        <h1>Error fetching</h1>
      </div>
    );

  return (
    <div className="main-container">
      <ul className="product-list">
        {items ? (
          searchedProducts?.map((item) => (
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
            className={index + 1 === page ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagineted;
