import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/slices/users/userSlice";
import { useLogoutQuery } from "../../redux/slices/authSlice/authSlice";
import { logOut, setMessage } from "../../redux/slices/users/userSlice";
import { selectOrdersResult } from "../../redux/slices/order/orderSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersResult).data?.orders;
  const user = useSelector(selectCurrentUser);
  const userOrders = orders.filter((order) => order.user_id === user.id);
  const { refetch } = useLogoutQuery();

  const handleLogout = async () => {
    try {
      await refetch();
      dispatch(logOut());
      dispatch(setMessage("Logged out"));
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h1>Profile</h1>
      <h3>{user.first_name}</h3>
      <h3>{user.last_name}</h3>
      <h3>{user.email}</h3>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>

      <div className="user-orders">
        <h2>My orders</h2>
        <ul>
          {userOrders.length ? (
            userOrders?.map((order) => (
              <li key={order?.id} className="order-list">
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
              </li>
            ))
          ) : (
            <h4>No available orders</h4>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
