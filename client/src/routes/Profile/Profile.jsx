import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Main from "./Main";
import Orders from "./Orders";
import { selectCurrentUser } from "../../redux/slices/users/userSlice";
import { useLogoutMutation } from "../../redux/slices/authSlice/authSlice";
import { logOut } from "../../redux/slices/users/userSlice";
import { selectOrdersResult } from "../../redux/slices/order/orderSlice";
import { setNotice, setError } from "../../redux/slices/notifications/notif";
import { useEffect, useState } from "react";

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("main");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersResult).data?.orders;
  const user = useSelector(selectCurrentUser);
  const userOrders = orders.filter((order) => order.user_id === user.id);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    document.title = `${user.first_name} ${user.last_name}`;
  });

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logOut());
      navigate("/login");
      dispatch(setNotice("Logged out"));
    } catch (e) {
      dispatch(setError(e.message));
      console.log(e);
    }
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <Navigation
          tab={currentTab}
          setTab={setCurrentTab}
          handleLogout={handleLogout}
        />
        {currentTab === "main" && <Main user={user} />}
        {currentTab === "orders" && <Orders userOrders={userOrders} />}
      </div>
    </div>
  );
};

export default Profile;
