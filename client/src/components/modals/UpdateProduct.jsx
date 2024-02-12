import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import { useUpdateProductMutation } from "../../redux/slices/products/productSlice";

const UpdateProduct = ({ product, closeFn }) => {
  const categories = useSelector(selectCategoriesResult)?.data?.categories;
  const [formData, setFormData] = useState(product);
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [updateProduct] = useUpdateProductMutation();

  const handleEditProduct = (e) => {
    e.preventDefault();
    try {
      updateProduct({
        ...formData,
        price: parseFloat(formData.price),
      }).unwrap();
      setFormData({
        name: "",
        price: 0,
        image: "",
        description: "",
        category_id: "",
      });
      closeFn(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Update Product: {product.name}</h2>
      <form onSubmit={handleEditProduct}>
        <label htmlFor="name">
          Name
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
        </label>
        <label htmlFor="">
          Price
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
            required
          />
        </label>
        <label htmlFor="">
          Image
          <input
            name="image"
            type="text"
            value={formData.image}
            onChange={handleFormChange}
            required
          />
        </label>
        <label htmlFor="">
          Description
          <textarea
            name="description"
            type="text"
            value={formData.description}
            onChange={handleFormChange}
            required
          />
        </label>
        <select
          name="category_id"
          id=""
          onChange={handleFormChange}
          value={formData.category_id}
        >
          <option value="default">Select a category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="btn-two">Update Product</button>
      </form>
      <button onClick={() => closeFn(null)}>close</button>
    </div>
  );
};

export default UpdateProduct;
