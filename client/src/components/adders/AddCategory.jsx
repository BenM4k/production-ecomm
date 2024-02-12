import { useState } from "react";
import { useAddCategoryMutation } from "../../redux/slices/category/category";

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
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          id="name"
          onChange={handleFormChange}
        />
      </label>
      <button className="btn-2">Add Category</button>
    </form>
  );
};

export default AddCategory;
