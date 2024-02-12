import { useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { TbCategory } from "react-icons/tb";
import { FaUser, FaClipboardCheck, FaImage } from "react-icons/fa";

import HandleUsers from "./HandleUsers";
import HandleProducts from "./HandleProduct";
import HandleCategories from "./HandleCategories";
import HandleBanners from "./HandleBanner";
import HandleOrders from "./HandleOrder";
import Records from "./Records";
import HandleReviews from "./HandleReviews";

const Admin = () => {
  const myList = [
    {
      name: "Users",
      pic: <FaUser />,
    },
    {
      name: "Categories",
      pic: <TbCategory />,
    },
    {
      name: "Orders",
      pic: <FaClipboardCheck />,
    },
    {
      name: "Banners",
      pic: <FaImage />,
    },
    {
      name: "Products",
      pic: <BsFillBagCheckFill />,
    },
    {
      name: "Reviews",
      pic: <TbCategory />,
    },
  ];
  const [activeTab, setActiveTab] = useState(() => "users");

  const users = [];

  const handleDisplay = (category) => {
    setActiveTab(category);
  };

  return (
    <div className="admin-wrapper">
      <div className="nav-list">
        {myList.map((list) => (
          <button
            key={list.name}
            onClick={() => handleDisplay(list?.name.toLowerCase())}
            className={activeTab === list?.name.toLowerCase() ? "active" : ""}
          >
            {list.pic}
            <span>{list.name}</span>
          </button>
        ))}
      </div>

      <div className="content">
        <Records />

        <div className="content-body">
          {activeTab === "users" && (
            <div className="users">
              <div className="dash-head">
                <FaUser />
                <h2>Users List</h2>
              </div>
              {users?.length ? <HandleUsers /> : <p>No users to display</p>}
            </div>
          )}

          {activeTab === "products" && <HandleProducts />}

          {activeTab === "categories" && (
            <div className="admin-cat">
              <HandleCategories />
            </div>
          )}

          {activeTab === "banners" && (
            <div className="dash-banners">
              <HandleBanners />
            </div>
          )}

          {activeTab === "orders" && (
            <div className="users-orders">
              <div className="dash-head">
                <FaClipboardCheck />
                <h2>Orders List</h2>
              </div>
              <div className="orders">
                <HandleOrders />
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <>
              <HandleReviews />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
