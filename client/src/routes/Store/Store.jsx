import Paginated from "./Page";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { useGetStoreProductQuery } from "../../redux/slices/products/productSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import { productsRange } from "../../lib/lists";

const Store = () => {
  const productsResults = useSelector(selectProductsResult);
  const totalProducts = productsResults?.data?.total;
  const [selectedRange, setSelectedRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const { data, isLoading, isError } = useGetStoreProductQuery({
    page: currentPage,
    range: selectedRange,
  });

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = "Store";
  }, [currentPage]);

  return (
    <div className="store-container">
      <div className="left-pane">
        <Filters ranges={productsRange} onChange={handleRangeChange} />
      </div>
      <div className="right-pane">
        <SearchBar onChange={setSearchItem} />
        <Paginated
          isLoading={isLoading}
          isError={isError}
          items={data?.products}
          itemsPerPage={9}
          total={totalProducts}
          page={currentPage}
          setCurrentPage={setCurrentPage}
          searchItem={searchItem}
        />
      </div>
    </div>
  );
};

export default Store;
