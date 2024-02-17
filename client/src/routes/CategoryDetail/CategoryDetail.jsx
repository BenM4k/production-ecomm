import { useParams } from "react-router-dom";
import { useGetSingleCategoryQuery } from "../../redux/slices/category/category";
import Product from "../Home/Product";

const CategoryDetail = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetSingleCategoryQuery(id);

  const category = data?.category;
  const products = data?.category.Product;

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  if (isError)
    return (
      <div>
        <h1>Error fetching</h1>
      </div>
    );

  if (products.length === 0) {
    return (
      <div className="category-detail">
        <h2>{category.name}</h2>
        <p className="desc">{category.description}</p>
        <h4>No product matched this category</h4>
      </div>
    );
  }
  return (
    <div className="category-detail">
      <h2>{category.name}</h2>
      <p className="desc">{category.description}</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDetail;
