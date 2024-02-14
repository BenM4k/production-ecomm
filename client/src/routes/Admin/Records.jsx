import { useSelector } from "react-redux";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import { selectOrdersResult } from "../../redux/slices/order/orderSlice";
import { FaUser, FaClipboardCheck, FaImage } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { BsFillBagCheckFill } from "react-icons/bs";

const Records = () => {
  const totalOrders = useSelector(selectOrdersResult).data?.total;
  const banners = [];
  const totalCategories = useSelector(selectCategoriesResult).data?.total;
  const users = [];
  const totalProducts = useSelector(selectProductsResult).data?.total;

  return (
    <ul className="content-header">
      <li>
        <FaUser />
        <p>{users?.length}</p>
        <span>Users</span>
      </li>
      <li>
        <TbCategory />
        <p>{totalCategories}</p>
        <span>Categories</span>
      </li>
      <li>
        <FaClipboardCheck />
        <p>{totalOrders}</p>
        <span>Orders</span>
      </li>
      <li>
        <FaImage />
        <p>{banners?.length}</p>
        <span>Banners</span>
      </li>
      <li>
        <BsFillBagCheckFill />
        <p>{totalProducts}</p>
        <span>Products</span>
      </li>
    </ul>
  );
};

export default Records;
