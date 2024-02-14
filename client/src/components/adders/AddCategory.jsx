import { useState } from "react";
import { useAddCategoryMutation } from "../../redux/slices/category/category";
import PrimaryButton from "../buttons/PrimaryButton";
import FirstInput from "../inputs/FirstInput";

const AddCategory = () => {
  const [addCategory] = useAddCategoryMutation();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { name } = formData;
      const category = {
        name,
      };
      addCategory(category).unwrap();
      setFormData({
        name: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">
        Category name
        <FirstInput
          id={name}
          type={"text"}
          name={"name"}
          value={formData.name}
          onChange={handleFormChange}
        />
      </label>
      <PrimaryButton>Add Category</PrimaryButton>
    </form>
  );
};

export default AddCategory;
