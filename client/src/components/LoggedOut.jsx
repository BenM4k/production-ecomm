import { useEffect } from "react";
import { selectCurrentUser } from "../redux/slices/users/userSlice";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const LoggedOut = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  });

  return <>{!user && <Outlet />}</>;
};

export default LoggedOut;
