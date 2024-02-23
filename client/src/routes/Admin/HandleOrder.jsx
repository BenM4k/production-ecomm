import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectOrdersResult } from "../../redux/slices/order/orderSlice";
import { useDeleteOrderMutation } from "../../redux/slices/order/orderSlice";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { useEffect, useState } from "react";
import UpdateOrder from "../../components/modals/UpdateOrder";
import { setError, setSuccess } from "../../redux/slices/notifications/notif";
import Modal from "../../components/modals/Modal";

const HandleOrders = () => {
  const orders = useSelector(selectOrdersResult).data?.orders;
  const [editOrder, setEditOrder] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState({});
  const [deleteOrder] = useDeleteOrderMutation();
  const dispatch = useDispatch();

  const handleEditOrder = (order) => {
    setEditOrder(true);
    setOrderToEdit(order);
  };

  const handleDeleteOrder = async (order) => {
    try {
      await deleteOrder(order.id).unwrap();
      dispatch(setSuccess("Order deleted successfully"));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    document.title = "Orders List";
  });

  return (
    <>
      <ul className="admin-orders-title">
        <li className="order-id">id</li>
        <li className="order-address">address</li>
        <li className="order-tn">tracking number</li>
        <li className="order-status">status</li>
        <li className="order-total">total</li>
        <li className="order-actions">actions</li>
      </ul>
      <ul className="admin-orders-body">
        {orders.length ? (
          orders?.map((order) => (
            <li key={order?.id} className="order-list">
              <div className="order-id ">
                <NavLink to={`/orders/${order.id}`}>{order.id}</NavLink>
              </div>
              <p className="order-address ">{order.Shipping[0].address}</p>
              <p className="order-track ">
                {order.Shipping[0].tracking_number}
              </p>
              <p className={`order-status ${order.order_status.toLowerCase()}`}>
                {order.order_status}
              </p>
              <p className="order-total ">${order.total_amount}</p>
              <div className="buttons">
                <PrimaryButton buttonFn={() => handleEditOrder(order)}>
                  <FaEdit />
                </PrimaryButton>
                <SecondaryButton buttonFn={() => handleDeleteOrder(order)}>
                  <FaTrashAlt />
                </SecondaryButton>
              </div>
            </li>
          ))
        ) : (
          <p>No orders to display</p>
        )}
      </ul>
      {editOrder && (
        <Modal isOpen={orderToEdit} onClose={() => setEditOrder(false)}>
          <UpdateOrder
            order={orderToEdit}
            closeFn={() => setEditOrder(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default HandleOrders;
