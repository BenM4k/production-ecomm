import { useSelector } from "react-redux";
import { useState, useMemo, useCallback } from "react";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import { useAddProductMutation } from "../../redux/slices/products/productSlice";
import { selectCurrentUser } from "../../redux/slices/users/userSlice";
import FirstInput from "../inputs/FirstInput";
import FirstTextArea from "../inputs/FirstTextArea";

const AddProduct = () => {
  const [addProduct] = useAddProductMutation();
  const user = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    seller_id: user?.Seller[0]?.id,
    name: "",
    price: 0,
    image: "",
    quantity: 1,
    description: "",
    category_id: "",
  });

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const memoizedFormData = useMemo(() => formData, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const {
        seller_id,
        name,
        price,
        image,
        quantity,
        description,
        category_id,
      } = formData;
      const product = {
        seller_id,
        name,
        price: Number(price),
        image,
        quantity,
        description,
        category_id,
      };
      addProduct(product).unwrap();
      setFormData({
        seller_id: user?.Seller[0]?.id,
        name: "",
        price: 0,
        image: "",
        quantity: 1,
        description: "",
        category_id: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const categories = useSelector(selectCategoriesResult)?.data?.categories;
  return (
    <>
      <h2>Upload a Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <FirstInput
            name={"name"}
            type={"text"}
            value={memoizedFormData.name}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <FirstInput
            name={"price"}
            type={"number"}
            value={memoizedFormData.price}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="image">
          Image
          <FirstInput
            name={"image"}
            type={"text"}
            value={memoizedFormData.image}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <FirstTextArea
            name="description"
            type="text"
            value={memoizedFormData.description}
            onChange={handleFormChange}
            required
          />
        </label>
        <select
          name="category_id"
          id=""
          onChange={handleFormChange}
          value={memoizedFormData.category_id}
        >
          <option value="default">Select a category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="btn-two">Add Product</button>
      </form>
    </>
  );
};

export default AddProduct;
