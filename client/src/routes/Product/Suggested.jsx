import { NavLink } from "react-router-dom";
import phone from "../../assets/phone_2.png";
const Suggested = ({ suggested }) => {
  return (
    <>
      <h2>In the same category</h2>
      <ul>
        {suggested?.slice(0, 4).map((product) => (
          <li key={product?.id}>
            <NavLink to={`/products/${product.id}`}>
              <img src={phone} alt={product.name} />
              <p>{product.name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Suggested;
