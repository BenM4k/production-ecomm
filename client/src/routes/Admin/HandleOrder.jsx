import { FiDelete } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOrdersResult } from "../../redux/slices/order/orderSlice";

const HandleOrders = () => {
  const orders = useSelector(selectOrdersResult).data?.orders;
  return (
    <div>
      <ul>
        {orders.length ? (
          orders?.map((order) => (
            <li key={order?.id} className="order-list">
              <div className="order-user flex-center">
                <h4>User</h4>
                <p>{order.customerName}</p>
              </div>
              <div className="order-id flex-center">
                <h4>id</h4>
                <NavLink to={`/order/${order.id}`}>{order.id}</NavLink>
              </div>
              <div className="order-address flex-center">
                <h4>Address</h4>
                <p>{order.Shipping[0].address}</p>
              </div>
              <div className="order-address flex-center">
                <h4>Tracking_number</h4>
                <p>{order.Shipping[0].tracking_number}</p>
              </div>
              <div className="order-status flex-center">
                <h4>Status</h4>
                <p>{order.order_status}</p>
              </div>
              <div className="order-total flex-center">
                <h4>Total</h4>
                <p>${order.total_amount}</p>
              </div>
              <button>
                <FiDelete />
              </button>
              <button>
                <FaEdit />
              </button>
            </li>
          ))
        ) : (
          <p>No orders to display</p>
        )}
      </ul>
    </div>
  );
};

export default HandleOrders;
