import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleError = (err, errInfo) => {
      console.log(err, errInfo);
      setError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return (
    <>
      <Navbar />
      {error && <div>Something went wrong</div>}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
