import { BsFillBagCheckFill } from "react-icons/bs";
import { FaClipboardCheck, FaImage, FaUser } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";

const NavList = ({ activeTab, setActiveTab }) => {
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

  const handleDisplay = (category) => {
    setActiveTab(category);
  };

  return (
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
  );
};

export default NavList;
