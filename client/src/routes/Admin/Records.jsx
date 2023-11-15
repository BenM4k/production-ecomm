import { useSelector } from 'react-redux';
import { selectProductsResult } from '../../redux/slices/products/productSlice';
import { selectCategoriesResult } from '../../redux/slices/category/category';
import { FaUser, FaClipboardCheck, FaImage } from 'react-icons/fa';
import {TbCategory} from 'react-icons/tb';
import {BsFillBagCheckFill} from 'react-icons/bs';

const Records = () => {
    const orders =[]
    const banners = []
    const categories = useSelector(selectCategoriesResult)?.data?.categories;
    const users = [];
    const products = useSelector(selectProductsResult)?.data?.products;

  return (
    <ul className="content-header">
        <li>
            <FaUser />
            <p>{users.length}</p>
            <span>Users</span>
        </li>
        <li>
            <TbCategory />
            <p>{categories?.length}</p>
            <span>Categories</span>
        </li>
        <li>
            <FaClipboardCheck />
            <p>{orders?.length}</p>
            <span>Orders</span>
        </li>
        <li>
            <FaImage />
            <p>{banners?.length}</p>
            <span>Banners</span>
        </li>
        <li>
            <BsFillBagCheckFill />
            <p>{products?.length}</p>
            <span>Products</span>
        </li>
    </ul>
  )
}

export default Records;