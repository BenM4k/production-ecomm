import Paginated from "./Page";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { useGetStoreProductQuery } from "../../redux/slices/products/productSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Store = () => {
  const productsResults = useSelector(selectProductsResult);
  const totalProducts = productsResults?.data?.total;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetStoreProductQuery(currentPage);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="main-container">
      <Paginated
        isLoading={isLoading}
        isError={isError}
        items={data?.products}
        itemsPerPage={12}
        total={totalProducts}
        page={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Store;
