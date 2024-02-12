import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectCurrentToken } from "../redux/slices/users/userSlice";
import { useRefreshQuery } from "../redux/slices/authSlice/authSlice";
import { setCredentials } from "../redux/slices/users/userSlice";
import MainSpinner from "./spinners/MainSpinner";

const PersistentLogin = () => {
  const { data, isLoading } = useRefreshQuery();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        if (data) {
          dispatch(setCredentials({ token: data.token, user: data.user }));
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (!token && !isLoading) {
      verifyRefreshToken();
    }
  }, [data, token, isLoading]);

  return <div>{isLoading ? <MainSpinner /> : <Outlet />}</div>;
};

export default PersistentLogin;
