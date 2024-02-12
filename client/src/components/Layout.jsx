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
      }, 4000);
      return () => clearTimeout(timer);
    }

    if (info) {
      timer = setTimeout(() => {
        dispatch(clearInfo());
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (notice) {
      timer = setTimeout(() => {
        dispatch(clearNotice());
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (success) {
      timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, error, info, notice, success]);

  return (
    <>
      <Navbar />
      <div className={notice ? "notices" : ""}>
        {notice && <p>⚠️ {notice}</p>}
      </div>
      <div className={error ? "errors" : ""}>{error && <p>❌ {error}</p>}</div>
      <div className={success ? "success" : ""}>
        {success && <p>✅ {success}</p>}
      </div>
      <div className={info ? "infos" : ""}>{info && <p>ℹ️ {info}</p>}</div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
