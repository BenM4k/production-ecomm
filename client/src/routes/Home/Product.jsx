import { NavLink } from "react-router-dom";
import phone from "../../assets/phone_1.png";

const Product = ({ product }) => {
  return (
    <>
      <NavLink to={`/products/${product.id}`}>
        <img src={phone} alt={product.name} />
        <div className="detail">
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </NavLink>
    </>
  );
};

export default Product;
