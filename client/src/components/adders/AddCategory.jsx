import { useState } from "react";
import { useAddCategoryMutation } from "../../redux/slices/category/category";
import PrimaryButton from "../buttons/PrimaryButton";
import FirstInput from "../inputs/FirstInput";
import FirstTextArea from "../inputs/FirstTextArea";

const AddCategory = () => {
  const [addCategory] = useAddCategoryMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      const { name, description } = formData;
      const category = {
        name,
        description,
      };
      addCategory(category).unwrap();
      setFormData({
        name: "",
        description: "",
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
      <label htmlFor="description">
        <FirstTextArea
          id={"description"}
          name={"description"}
          value={formData.description}
          onChange={handleFormChange}
          placeholder={"category description"}
        />
      </label>
      <PrimaryButton>Add Category</PrimaryButton>
    </form>
  );
};

export default AddCategory;
