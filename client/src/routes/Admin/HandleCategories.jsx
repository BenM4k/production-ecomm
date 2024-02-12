import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/slices/category/category";
import { FiDelete } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import AddCategory from "../../components/adders/AddCategory";
import UpdateCategory from "../../components/modals/UpdateCategory";

const HandleCategories = () => {
  const categories = useSelector(selectCategoriesResult)?.data?.categories;
  const [deleteCategory] = useDeleteCategoryMutation();
  const [id, setId] = useState(null);
  const cat = categories?.find((category) => category.id === id);
  const handleDelete = (id) => {
    try {
      deleteCategory(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="">
        <div className="dash-head">
          <h2>Categories List</h2>
        </div>
        <ul className="admin-categories">
          {categories.map((category) => (
            <li key={category.id}>
              <h3>{category.name}</h3>
              <div className="buttons">
                <button onClick={() => handleDelete(category?.id)}>
                  <FiDelete />
                </button>
                <button onClick={() => setId(category?.id)}>
                  <FaEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="add-category">
          <AddCategory />
        </div>
      </div>
      <div className="update-category">
        {id && <UpdateCategory category={cat} setId={setId} />}
      </div>
    </>
  );
};

export default HandleCategories;
