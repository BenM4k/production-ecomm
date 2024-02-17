import { useDispatch, useSelector } from "react-redux";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { NavLink, useParams } from "react-router-dom";
import Suggested from "./Suggested";
import Feedback from "./Feedback";
import ProductImage from "./ProductImage";
import { addToCart } from "../../redux/slices/users/userSlice";
import { useEffect } from "react";
import FirstRating from "../../components/ratings/FirstRating";
import { useGetSingleProductQuery } from "../../redux/slices/products/productSlice";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod));
  };
  const product = data?.product;
  const suggested = data?.suggestedProducts;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (isLoading)
    return (
      <div className="product-container">
        <h1>Loading...</h1>
      </div>
    );
  if (isError)
    return (
      <div className="product-container">
        <h1>Error getting product.</h1>
      </div>
    );
  return (
    <div className="product-container">
      <div className="prod-head">
        <div className="left">
          <div className="nav">
            <NavLink to="/store">
              <span>Browse All </span> &#8594;
            </NavLink>
            <NavLink to={`/categories/${product.category_id}`}>
              <span>Category</span> &#8594;
            </NavLink>
            <p>{product.name}</p>
          </div>
          <h2>{product.name}</h2>
          <div className="price">
            <p>${product?.price}</p>
            <div className="ratings">
              <FirstRating reviews={product.Review} />
            </div>
          </div>
          <p className="desc">{product.description}</p>
          <div className="select">
            <p>variant</p>
            <select name="" id="">
              <option value="default">Select a variant</option>
            </select>
          </div>

          <button className="btn-two">Buy Now</button>
          <button className="btn-3" onClick={() => handleAddToCart(product)}>
            Add To cart
          </button>

          <div className="shipping"></div>
          <div className="returns"></div>
        </div>
        <div className="right">
          <ProductImage product={product} />
        </div>
      </div>

      <div className="feedback">
        <Feedback reviews={product?.Review} product={product} />
      </div>

      <div className="suggested">
        <Suggested suggested={suggested} />
      </div>
    </div>
  );
};

export default Product;
