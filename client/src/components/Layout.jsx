import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  selectNotificationError,
  selectNotificationInfo,
  selectNotificationNotice,
  selectNotificationSuccess,
  clearError,
  clearInfo,
  clearNotice,
  clearSuccess,
} from "../redux/slices/notifications/notif";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Notifications from "./Notifications";

const Layout = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectNotificationError);
  const info = useSelector(selectNotificationInfo);
  const notice = useSelector(selectNotificationNotice);
  const success = useSelector(selectNotificationSuccess);

  useEffect(() => {
    let timer;

    if (error) {
      timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }

    if (info) {
      timer = setTimeout(() => {
        dispatch(clearInfo());
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (notice) {
      timer = setTimeout(() => {
        dispatch(clearNotice());
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (success) {
      timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, error, info, notice, success]);

  return (
    <>
      <Navbar />
      <Notifications
        error={error}
        info={info}
        notice={notice}
        success={success}
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
