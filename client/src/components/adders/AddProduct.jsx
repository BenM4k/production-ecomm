import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import { useAddProductMutation } from "../../redux/slices/products/productSlice";
import { selectCurrentUser } from "../../redux/slices/users/userSlice";

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

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
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
      <form onSubmit={handleSubmit}>
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
        <label htmlFor=""></label>
        Image
        <input
          name="image"
          type="text"
          value={formData.image}
          onChange={handleFormChange}
          required
        />
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
        <button className="btn-two">Add Product</button>
      </form>
    </>
  );
};

export default AddProduct;
