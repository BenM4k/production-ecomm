import { useSelector } from "react-redux"
import { selectProductsResult } from '../../redux/slices/products/productSlice'
import { NavLink, useParams } from "react-router-dom";
import Suggested from "./Suggested";
import Feedback from "./Feedback";
import ProductImage from "./ProductImage";

const Product = () => {
  const { id } = useParams();
  const products = useSelector(selectProductsResult)?.data?.products;
  const product = products.find((p) => p.id === id);
  const suggested = products.filter((p) => p.category === product.category && p.id !== product.id)

  return (
    <div className="product-container">
      <div className="prod-head">
        <div className="left">
          <div className="nav">
            <NavLink to='/store'>Browse All </NavLink>
            <NavLink to='/categories'> Category </NavLink>
            <p>{product?.name}</p>
          </div>
          <h2>{product?.name}</h2>
          <div className="price">
            <span>${product?.price}</span>
            <p>Reviews</p>
          </div>
          <p className="desc">{product?.description}</p>
          <div className="select">
            <p>variant</p>
            <select name="" id="">
              <option value="default">Select a variant</option>
            </select>
          </div>

          <button className="btn-two">Buy Now</button>
          <button className="btn-3">Add To cart</button>

          <div className="shipping"></div>
          <div className="returns"></div>
        </div>
        <div className="right">
          <ProductImage product={product}/>
        </div>
      </div>

      <div className="feedback">
        <Feedback reviews={product?.Review} productId={id}/>
      </div>

      <div className="suggested">
        <Suggested suggested={suggested}/>
      </div>
    </div>
  )
}

export default Product