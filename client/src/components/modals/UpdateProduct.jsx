import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import { useUpdateProductMutation } from "../../redux/slices/products/productSlice";
import FirstInput from "../inputs/FirstInput";
import FirstTextArea from "../inputs/FirstTextArea";
import CloseButton from "../buttons/CloseButton";
import {
  setError,
  setSuccess,
  setInfo,
} from "../../redux/slices/notifications/notif";

const UpdateProduct = ({ product, closeFn }) => {
  const dispatch = useDispatch();
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
      dispatch(setSuccess(`Updated product ${formData.name} successfully`));
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData(product);
  }, [product]);

  return (
    <div>
      <div className="close-prod">
        <CloseButton closeFn={() => closeFn(null)} />
      </div>
      <h2>Update Product: {product.name}</h2>
      <form onSubmit={handleEditProduct}>
        <label htmlFor="name">
          Name
          <FirstInput
            name="name"
            type="text"
            value={formData.name}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <FirstInput
            name="price"
            type="number"
            value={formData.price}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="image">
          Image
          <FirstInput
            name="image"
            type="text"
            value={formData.image}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <FirstTextArea
            name="description"
            type="text"
            value={formData.description}
            onChange={handleFormChange}
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
    </div>
  );
};

export default UpdateProduct;
