import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/users/userSlice";
import CartProduct from "./CartProduct";
import { useEffect } from "react";

const Cart = () => {
  const cart = useSelector(selectCart);

  let total = 0;

  cart?.forEach((item) => {
    let amount = item.price * item.itemCount;
    total += amount;
  });

  useEffect(() => {
    document.title = "Cart";
  });

  return (
    <div className="cart-container">
      {cart.length ? (
        <ul className="cart-list">
          {cart?.map((product) => (
            <CartProduct product={product} key={product.id} />
          ))}
        </ul>
      ) : (
        <h2>Your cart is empty</h2>
      )}

      <div className="total">
        {cart?.length ? (
          <p>
            Total : <span>${total.toFixed(2)}</span>
          </p>
        ) : (
          <span />
        )}
      </div>
      <button type="button" className="buy-now">
        {cart?.length ? <NavLink to="/shipping">Buy now</NavLink> : <span />}
      </button>
    </div>
  );
};

export default Cart;
