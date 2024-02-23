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
      <div className="cart-list">
        <ul className="list-head">
          <li className="head-product">Product</li>
          <li className="head-price">Price</li>
          <li className="head-quantity">Quantity</li>
          <li className="head-total">Total</li>
          <li className="head-remove">remove</li>
        </ul>
        <ul className="list-body">
          {cart.length ? (
            cart?.map((product) => (
              <CartProduct product={product} key={product.id} />
            ))
          ) : (
            <li>
              <div className="empty-cart">Your cart is empty</div>
            </li>
          )}
        </ul>
      </div>

      <div className="summary">
        <h2>
          Cart Summary <span />
        </h2>
        <div className="summary-content">
          {cart?.length ? (
            <>
              <p>
                Subtotal : <span>${total.toFixed(2)}</span>
              </p>
              <p>
                Shipping : <span>${0}</span>
              </p>
              <p>
                Taxes : <span>${0}</span>
              </p>
              <p>
                Total: <span>{total.toFixed(2)}</span>
              </p>
            </>
          ) : (
            <span />
          )}
          <button type="button" className="buy-now">
            {cart?.length ? (
              <NavLink to="/shipping">Buy now</NavLink>
            ) : (
              <span />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
