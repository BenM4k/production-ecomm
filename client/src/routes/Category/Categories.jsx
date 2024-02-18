import { useSelector } from "react-redux";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import Category from "./Category";
import { useEffect } from "react";

const Categories = () => {
  const categories = useSelector(selectCategoriesResult).data?.categories;

  useEffect(() => {
    document.title = "Categories";
  });

  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Category category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
