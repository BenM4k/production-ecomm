import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import { useDeleteCategoryMutation } from "../../redux/slices/category/category";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddCategory from "../../components/adders/AddCategory";
import UpdateCategory from "../../components/modals/UpdateCategory";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";

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
      <div className="cat-body">
        <div className="dash-head">
          <h2>Categories List</h2>
        </div>
        <ul className="admin-categories">
          {categories.map((category) => (
            <li key={category.id}>
              <h3>{category.name}</h3>
              <div className="buttons">
                <PrimaryButton buttonFn={() => setId(category?.id)}>
                  <FaEdit />
                </PrimaryButton>
                <SecondaryButton buttonFn={() => handleDelete(category?.id)}>
                  <FaTrashAlt />
                </SecondaryButton>
              </div>
            </li>
          ))}
        </ul>
        <div className="add-category">
          <AddCategory />
        </div>
      </div>
      <div className={id ? "update-category" : ""}>
        {id && <UpdateCategory category={cat} setId={setId} />}
      </div>
    </>
  );
};

export default HandleCategories;
