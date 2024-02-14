import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateCategoryMutation } from "../../redux/slices/category/category";
import CloseButton from "../buttons/CloseButton";
import FirstInput from "../inputs/FirstInput";
import PrimaryButton from "../buttons/PrimaryButton";
import {
  setSuccess,
  setError,
  setInfo,
} from "../../redux/slices/notifications/notif";

const UpdateCategory = ({ category, setId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(category.name);
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    setName(category.name);
  }, [category]);

  const handleEditCategory = (e) => {
    e.preventDefault();
    const newCategory = { ...category, name: name };
    try {
      if (name === category.name) {
        dispatch(setInfo("Please update category name"));
        return;
      }
      updateCategory(newCategory).unwrap();
      setName("");
      dispatch(setSuccess(`Updated category ${category.name} successfully`));
    } catch (err) {
      dispatch(setError(err.message));
      console.log(err);
    }
  };

  return (
    <div>
      <div className="close-cat">
        <CloseButton closeFn={() => setId(null)}>
          <p>close</p>
        </CloseButton>
      </div>
      <h2>
        Update category <span>{category.name}</span>
      </h2>
      <form onSubmit={handleEditCategory}>
        <FirstInput
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <PrimaryButton>Update</PrimaryButton>
      </form>
    </div>
  );
};

export default UpdateCategory;
