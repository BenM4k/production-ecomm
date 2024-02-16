import { lazy, Suspense } from "react";
import Home from "./routes/Home/Home";
import MainSpinner from "./components/spinners/MainSpinner";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { Route, Routes } from "react-router-dom";
import PersistentLogin from "./components/PersistentLogin";
import LoggedOut from "./components/LoggedOut";
import Store from "./routes/Store/Store";
import Product from "./routes/Product/Product";

const Admin = lazy(() => import("./routes/Admin/Admin"));
const Cart = lazy(() => import("./routes/Cart/Cart"));
const Category = lazy(() => import("./routes/Category/Category"));
const Login = lazy(() => import("./routes/Login/Login"));
const NotFound = lazy(() => import("./routes/NotFound/NotFound"));
const Profile = lazy(() => import("./routes/Profile/Profile"));
const SignUp = lazy(() => import("./routes/SignUp/SignUp"));
const Unauthorized = lazy(() => import("./routes/Unauthorized/Unauthorized"));
const Order = lazy(() => import("./routes/Order/Order"));

function App() {
  return (
    <>
      <Suspense fallback={<MainSpinner />}>
        <Routes>
          <Route element={<PersistentLogin />}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/store" element={<Store />} />
              <Route element={<LoggedOut />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
              </Route>
              <Route path="/Unauthorized" element={<Unauthorized />} />

              <Route element={<RequireAuth role={"USER"} />}>
                <Route path="shipping" element={<Order />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/profile/:uname" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
