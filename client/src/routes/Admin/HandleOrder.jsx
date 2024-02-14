import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOrdersResult } from "../../redux/slices/order/orderSlice";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";

const HandleOrders = () => {
  const orders = useSelector(selectOrdersResult).data?.orders;
  return (
    <>
      <ul>
        {orders.length ? (
          orders?.map((order) => (
            <li key={order?.id} className="order-list">
              {/* <div className="order-user ">
                <h4>User</h4>
                <p>{order.customerName}</p>
              </div> */}
              <div className="order-id ">
                <h4>id</h4>
                <NavLink to={`/order/${order.id}`}>{order.id}</NavLink>
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
                <PrimaryButton>
                  <FaEdit />
                </PrimaryButton>
                <SecondaryButton>
                  <FaTrashAlt />
                </SecondaryButton>
              </div>
            </li>
          ))
        ) : (
          <p>No orders to display</p>
        )}
      </ul>
    </>
  );
};

export default HandleOrders;
