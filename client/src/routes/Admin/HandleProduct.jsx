import { useSelector } from 'react-redux';
import { selectProductsResult } from '../../redux/slices/products/productSlice';
import { selectCategoriesResult } from '../../redux/slices/category/category';
import AddProduct from '../../components/adders/AddProduct';

const HandleProducts = () => {
  const products = useSelector(selectProductsResult)?.data?.products;

  return (
    <div>
        <div className="dash-head">
            <h2>Products List</h2>
            <ul>
              {products?.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
        </div>

        <div className="add-product">
          <AddProduct />
        </div>
    </div>
  )
}

export default HandleProducts;