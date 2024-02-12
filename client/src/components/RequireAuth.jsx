import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/users/userSlice";

const RequireAuth = ({ role }) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return (
    <div>
      {user?.role === role || user?.role === "ADMIN" ? (
        <Outlet />
      ) : user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </div>
  );
};

export default RequireAuth;
