import { Suspense, lazy, useState } from "react";
import { useGetBannersQuery } from "../../redux/slices/banners/banners";

import Records from "./Records";
import NavList from "./NavList";
import HandleUsers from "./HandleUsers";

const HandleBanners = lazy(() => import("./HandleBanner"));
const HandleCategories = lazy(() => import("./HandleCategories"));
const HandleOrders = lazy(() => import("./HandleOrder"));
const HandleProducts = lazy(() => import("./HandleProduct"));
const HandleReviews = lazy(() => import("./HandleReviews"));

const Admin = () => {
  const [activeTab, setActiveTab] = useState(() => "users");

  //datas
  const { data: bannersData } = useGetBannersQuery();
  const banners = bannersData?.banners;

  return (
    <div className="admin-wrapper">
      <NavList activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="content">
        <Records />

        <div className="content-body">
          {activeTab === "users" && (
            <div className="admin-users">
              <div className="dash-head">
                <h2>Users List</h2>
              </div>
              <HandleUsers />
            </div>
          )}

          {activeTab === "products" && (
            <Suspense fallback={<h1>Loading...</h1>}>
              <HandleProducts />
            </Suspense>
          )}

          {activeTab === "categories" && (
            <div className="admin-cat">
              <Suspense fallback={<h1>Loading...</h1>}>
                <HandleCategories />
              </Suspense>
            </div>
          )}

          {activeTab === "banners" && (
            <div className="dash-banners">
              <Suspense fallback={<h1>Loading...</h1>}>
                <HandleBanners banners={banners} />
              </Suspense>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="admin-orders">
              <div className="dash-head">
                <h2>Orders List</h2>
              </div>
              <div className="orders">
                <Suspense fallback={<h1>Loading...</h1>}>
                  <HandleOrders />
                </Suspense>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <>
              <Suspense fallback={<h1>Loading...</h1>}>
                <HandleReviews />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
