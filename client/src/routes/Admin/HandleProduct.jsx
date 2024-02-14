import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { useDeleteProductMutation } from "../../redux/slices/products/productSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddProduct from "../../components/adders/AddProduct";
import { useState } from "react";
import UpdateProduct from "../../components/modals/UpdateProduct";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";

const HandleProducts = () => {
  const [productToUpdate, setProductToUpdate] = useState(null);
  const products = useSelector(selectProductsResult)?.data?.products;
  const [deleteProduct] = useDeleteProductMutation();
  const handleDelete = (id) => {
    try {
      deleteProduct(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-prods">
      <div className="products-body">
        <div className="dash-head">
          <h2>Products List</h2>
          <ul>
            {products?.map((product) => (
              <li key={product.id}>
                <div className="details">
                  <NavLink to={`/products/${product.id}`}>
                    <p>{product.name}</p>
                  </NavLink>
                  <span>${product.price}</span>
                </div>
                <div className="buttons">
                  <PrimaryButton buttonFn={() => setProductToUpdate(product)}>
                    <FaEdit />
                  </PrimaryButton>
                  <SecondaryButton buttonFn={() => handleDelete(product?.id)}>
                    <FaTrashAlt />
                  </SecondaryButton>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="add-product">
          {productToUpdate ? (
            <UpdateProduct
              product={productToUpdate}
              closeFn={setProductToUpdate}
            />
          ) : (
            <AddProduct />
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleProducts;
