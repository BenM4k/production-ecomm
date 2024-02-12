import { useEffect } from "react";
import { selectCurrentUser } from "../redux/slices/users/userSlice";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const LoggedOut = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return <>{!user && <Outlet />}</>;
};

export default LoggedOut;
