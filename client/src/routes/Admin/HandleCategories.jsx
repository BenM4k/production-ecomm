import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import { useDeleteCategoryMutation } from "../../redux/slices/category/category";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddCategory from "../../components/adders/AddCategory";
import UpdateCategory from "../../components/modals/UpdateCategory";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { NavLink } from "react-router-dom";
import Modal from "../../components/modals/Modal";

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

  useEffect(() => {
    document.title = "Categories List";
  });

  return (
    <>
      <div className="cat-body">
        <div className="dash-head">
          <h2>Categories List</h2>
        </div>
        <ul className="admin-categories">
          {categories.map((category) => (
            <li key={category.id}>
              <NavLink to={`/categories/${category.id}`}>
                <h3>{category.name}</h3>
              </NavLink>
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
      {id && (
        <Modal isOpen={cat} onClose={() => setId(null)}>
          <UpdateCategory category={cat} setId={setId} />
        </Modal>
      )}
    </>
  );
};

export default HandleCategories;
