import { useSelector } from "react-redux";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import { selectOrdersResult } from "../../redux/slices/order/orderSlice";
import { selectBannersResult } from "../../redux/slices/banners/banners";
import { selectUsersResult } from "../../redux/slices/appUsers/appUsersSlice";
import { selectReviewsResult } from "../../redux/slices/review/reviewSlice";
import {
  FaUser,
  FaClipboardCheck,
  FaImage,
  FaClipboardList,
} from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { BsFillBagCheckFill } from "react-icons/bs";

const Records = () => {
  const totalOrders = useSelector(selectOrdersResult).data?.total;
  const totalBanners = useSelector(selectBannersResult).data?.total;
  const totalCategories = useSelector(selectCategoriesResult).data?.total;
  const TotalUsers = useSelector(selectUsersResult).data?.total;
  const totalProducts = useSelector(selectProductsResult).data?.total;
  const totalReviews = useSelector(selectReviewsResult).data?.total;

  return (
    <ul className="content-header">
      <li>
        <FaUser />
        <p>{TotalUsers}</p>
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
        <p>{totalBanners}</p>
        <span>Banners</span>
      </li>
      <li>
        <BsFillBagCheckFill />
        <p>{totalProducts}</p>
        <span>Products</span>
      </li>
      <li>
        <FaClipboardList />
        <p>{totalReviews}</p>
        <span>Reviews</span>
      </li>
    </ul>
  );
};

export default Records;
