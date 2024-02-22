import { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateOrderMutation } from "../../redux/slices/order/orderSlice";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import {
  setError,
  setSuccess,
  setNotice,
} from "../../redux/slices/notifications/notif";

const UpdateOrder = ({ order, closeFn }) => {
  const [formData, setFormData] = useState({
    id: order.id,
    shipping_id: order.Shipping[0].id,
    payment_status: order.order_status,
    shipping_status: order.Shipping[0].status,
  });

  const dispatch = useDispatch();
  const paymentStatus = ["PENDING", "PAID", "CANCELLED"];
  const shippingStatus = ["INPROGRESS", "SHIPPED", "DELIVERED"];

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [updateOrder, { isLoading, isError }] = useUpdateOrderMutation();

  const update = async (e) => {
    e.preventDefault();
    if (
      formData.shipping_id === order.Shipping[0].status &&
      formData.payment_status === order.order_status
    ) {
      dispatch(setNotice("Update order status"));
      return;
    }
    try {
      await updateOrder(formData).unwrap();
      setFormData({
        id: order.id,
        shipping_id: order.Shipping[0].id,
        payment_status: order.order_status,
        shipping_status: order.Shipping[0].id,
      });
      closeFn();
      dispatch(setSuccess("Order updated successfully"));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  if (isLoading)
    return (
      <div className="product-container">
        <h1>Loading...</h1>
      </div>
    );
  if (isError)
    return (
      <div className="product-container">
        <CloseButton closeFn={closeFn} />
        <h1>Error updating product.</h1>
      </div>
    );

  return (
      <div className="update-order">
        <h3>Order Update</h3>
        <form onSubmit={update}>
          <label htmlFor="shipping_status">
            Shipping Status
            <select
              name="shipping_status"
              id="shipping_status"
              value={formData.shipping_status}
              onChange={handleFormChange}
            >
              {shippingStatus.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="payment_status">
            Payment Status
            <select
              name="payment_status"
              id="payment_status"
              value={formData.payment_status}
              onChange={handleFormChange}
            >
              {paymentStatus.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <PrimaryButton>Update</PrimaryButton>
        </form>
      </div>
  );
};

export default UpdateOrder;
