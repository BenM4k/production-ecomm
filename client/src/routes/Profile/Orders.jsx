import { FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SecondaryButton from "../../components/buttons/SecondaryButton";

const Orders = ({ userOrders }) => {
  return (
    <div className="user-orders">
      <h2>My orders</h2>
      <ul>
        {userOrders?.length ? (
          userOrders?.map((order) => (
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
                <p>
                  {order.Shipping[0].status === "INPROGRESS"
                    ? "IN-PROGRESS"
                    : order.Shipping[0].status}
                </p>
              </div>
              <div
                className={`order-status ${order.order_status.toLowerCase()}`}
              >
                <h4>Payment</h4>
                <p>{order.order_status}</p>
              </div>

              <div className="order-total ">
                <h4>Total</h4>
                <p>${order.total_amount}</p>
              </div>
              <div className="buttons">
                <SecondaryButton>
                  <FaTrashAlt />
                </SecondaryButton>
              </div>
            </li>
          ))
        ) : (
          <h4 className="empty">No available orders</h4>
        )}
      </ul>
    </div>
  );
};

export default Orders;
