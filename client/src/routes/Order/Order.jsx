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
import { throttle } from "../../lib/throttle";

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
      quantity: product.quantity,
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

    console.log(order);

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
    <div>
      <h2>Order Page</h2>
      <form onSubmit={handleSubmitOrder}>
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
        <button>Order now</button>
      </form>
    </div>
  );
};

export default Order;
