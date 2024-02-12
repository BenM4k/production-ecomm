import { FiDelete } from "react-icons/fi";
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
              <div className="order-status flex-center">
                <h4>Status</h4>
                <p>{order.status}</p>
              </div>
              <div className="order-total flex-center">
                <h4>Total</h4>
                <p>{order.total}</p>
              </div>
              <button>
                <FiDelete />
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
