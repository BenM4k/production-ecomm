import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateCategoryMutation } from "../../redux/slices/category/category";
import FirstInput from "../inputs/FirstInput";
import PrimaryButton from "../buttons/PrimaryButton";
import {
  setSuccess,
  setError,
  setInfo,
} from "../../redux/slices/notifications/notif";
import FirstTextArea from "../inputs/FirstTextArea";

const UpdateCategory = ({ category, setId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: category?.name,
    description: category?.description,
  });

  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    setFormData({
      name: category.name,
      description: category.description,
    });
  }, [category]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    const newCategory = {
      ...category,
      name: formData.name,
      description: formData.description,
    };
    try {
      if (newCategory.name === category.name) {
        dispatch(setInfo("Please update category name"));
        return;
      }
      updateCategory(newCategory).unwrap();
      setFormData({});
      setId(null);
      dispatch(setSuccess(`Updated category ${category.name} successfully`));
    } catch (err) {
      dispatch(setError(err.message));
      console.log(err);
    }
  };

  return (
    <div className="update-category">
      <h2>
        Update category <span>{category.name}</span>
      </h2>
      <form onSubmit={handleEditCategory}>
        <label htmlFor="name">
          Name
          <FirstInput
            type={"text"}
            name={"name"}
            value={formData.name}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <FirstTextArea
            id={"description"}
            name={"description"}
            value={formData.description}
            onChange={handleFormChange}
            placeholder={"category description"}
          />
        </label>
        <PrimaryButton>Update</PrimaryButton>
      </form>
    </div>
  );
};

export default UpdateCategory;
