import { NavLink } from "react-router-dom";
const Category = ({ category }) => {
  return (
    <>
      <NavLink to={`/categories/${category.id}`}>{category.name}</NavLink>
    </>
  );
};

export default Category;
