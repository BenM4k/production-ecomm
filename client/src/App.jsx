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
const Categories = lazy(() => import("./routes/Category/Categories"));
const CategoryDetail = lazy(() =>
  import("./routes/CategoryDetail/CategoryDetail")
);
const OrderDetails = lazy(() => import("./routes/OrderDetails/OrderDetails"));
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
              <Route
                path="/categories"
                element={
                  <Suspense fallback={<MainSpinner />}>
                    <Categories />
                  </Suspense>
                }
              />
              <Route
                path="/categories/:id"
                element={
                  <Suspense fallback={<MainSpinner />}>
                    <CategoryDetail />
                  </Suspense>
                }
              />
              <Route
                path="/*"
                element={
                  <Suspense fallback={<MainSpinner />}>
                    <NotFound />
                  </Suspense>
                }
              />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/store" element={<Store />} />
              <Route element={<LoggedOut />}>
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<MainSpinner />}>
                      <Login />
                    </Suspense>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Suspense fallback={<MainSpinner />}>
                      <SignUp />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="/Unauthorized"
                element={
                  <Suspense fallback={<MainSpinner />}>
                    <Unauthorized />
                  </Suspense>
                }
              />

              <Route element={<RequireAuth role={"USER"} />}>
                <Route
                  path="/shipping"
                  element={
                    <Suspense fallback={<MainSpinner />}>
                      <Order />
                    </Suspense>
                  }
                />
                <Route
                  path="/orders/:id"
                  element={
                    <Suspense fallback={<MainSpinner />}>
                      <OrderDetails />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<MainSpinner />}>
                      <Admin />
                    </Suspense>
                  }
                />
                <Route
                  path="/profile/:uname"
                  element={
                    <Suspense fallback={<MainSpinner />}>
                      <Profile />
                    </Suspense>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <Suspense fallback={<MainSpinner />}>
                      <Cart />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
