import { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../redux/slices/category/category";

const UpdateCategory = ({ category, setId }) => {
  const [name, setName] = useState(category.name);
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    setName(category.name);
  }, [category]);

  const handleEditCategory = (e) => {
    e.preventDefault();
    const newCategory = { ...category, name: name };
    try {
      updateCategory(newCategory).unwrap();
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Update category {category.name}</h2>
      <form onSubmit={handleEditCategory}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button>Update</button>
      </form>
      <button onClick={() => setId(null)}>close</button>
    </div>
  );
};

export default UpdateCategory;
