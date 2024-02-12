import Paginated from "./Page";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { useSelector } from "react-redux";

const Store = () => {
  const productsResults = useSelector(selectProductsResult);
  const products = productsResults?.data?.products;

  return (
    <div className="main-container">
      <Paginated items={products} itemsPerPage={6} />
    </div>
  );
};

export default Store;
