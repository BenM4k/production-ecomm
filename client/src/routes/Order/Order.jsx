import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  selectCurrentUser,
} from "../../redux/slices/users/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddOrderMutation } from "../../redux/slices/order/orderSlice";
import { clearCart } from "../../redux/slices/users/userSlice";
import { setSuccess, setError } from "../../redux/slices/notifications/notif";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const cart = useSelector(selectCart);
  const shippingDetail = {
    address: "",
  };
  const [formData, setFormData] = useState(shippingDetail);

  const orderDetailData = [];

  let total = 0;
  cart.forEach((product) => {
    let amount = product.price * product.itemCount;
    total += amount;
    const orderProduct = {
      product_id: product.id,
      quantity: product.itemCount,
      subtotal: parseFloat(amount),
    };
    orderDetailData.push(orderProduct);
  });
  const [addOrder] = useAddOrderMutation();

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const order = {
      user_id: user.id,
      total_amount: total,
      order_detail_data: orderDetailData,
      shipping_data: formData,
    };

    if (formData.address) {
      try {
        addOrder(order).unwrap();
        dispatch(clearCart());
        setFormData(shippingDetail);
        navigate("/");
        dispatch(setSuccess("Order created successfully"));
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="order-page">
      <h2>Billing address</h2>
      <form onSubmit={handleSubmitOrder} className="bill">
        <label htmlFor="first_name">
          First Name
          <input type="text" id="first_name" name="first_name" />
        </label>
        <label htmlFor="last_name">
          Last Name
          <input type="text" id="last-name" name="last_name" />
        </label>
        <label htmlFor="email">
          Email
          <input type="text" id="email" name="email" />
        </label>
        <label htmlFor="mobile">
          Mobile No
          <input type="text" id="mobile" name="mobile" />
        </label>
        <label htmlFor="">
          Enter your address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="address_2">
          Address 2
          <input type="text" id="address_2" name="address_2" />
        </label>
        <label htmlFor="country">
          Country
          <input type="text" id="country" name="country" />
        </label>
        <label htmlFor="city">
          City
          <input type="text" id="city" name="city" />
        </label>
        <label htmlFor="state">
          State
          <input type="text" id="state" name="state" />
        </label>
        <label htmlFor="postal_code">
          Postal Code
          <input type="text" id="postal_code" name="postal_code" />
        </label>
        <button>Order now</button>
      </form>
      <div className="order-payment">
        <div className="order-det">
          <h2>Order total</h2>
        </div>
        <div className="payment-det">
          <h2>Payment</h2>
          <form action="">
            <label htmlFor="">
              <input type="radio" name="" id="" />
              Paypal
            </label>
            <label htmlFor="">
              <input type="radio" name="" id="" />
              Cash on delivery
            </label>
            <label htmlFor="">
              <input type="radio" name="" id="" />
              bank
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
