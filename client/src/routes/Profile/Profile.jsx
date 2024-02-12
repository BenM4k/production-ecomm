import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/slices/users/userSlice";
import { useLogoutQuery } from "../../redux/slices/authSlice/authSlice";
import { logOut, setMessage } from "../../redux/slices/users/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refetch } = useLogoutQuery();
  const user = useSelector(selectCurrentUser);

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
    </div>
  );
};

export default Profile;
