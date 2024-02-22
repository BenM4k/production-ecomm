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
      <ul>
        {orders.length ? (
          orders?.map((order) => (
            <li key={order?.id} className="order-list">
              <div className="order-id ">
                <h4>id</h4>
                <NavLink to={`/orders/${order.id}`}>{order.id}</NavLink>
              </div>
              <div className="order-address ">
                <h4>Address</h4>
                <p>{order.Shipping[0].address}</p>
              </div>
              <div className="order-track ">
                <h4>Tracking_number</h4>
                <p>{order.Shipping[0].tracking_number}</p>
              </div>
              <div
                className={`order-status ${order.order_status.toLowerCase()}`}
              >
                <h4>Status</h4>
                <p>{order.order_status}</p>
              </div>
              <div className="order-total ">
                <h4>Total</h4>
                <p>${order.total_amount}</p>
              </div>
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
