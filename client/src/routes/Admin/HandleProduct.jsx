import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { useDeleteProductMutation } from "../../redux/slices/products/productSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddProduct from "../../components/adders/AddProduct";
import { Suspense, useState, lazy, useEffect } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import Modal from "../../components/modals/Modal";

const UpdateProduct = lazy(() =>
  import("../../components/modals/UpdateProduct")
);
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

  useEffect(() => {
    document.title = "Products List";
  });

  return (
    <div className="admin-prods">
      <div className="products-body">
        <div className="dash-head">
          <h2>Products List</h2>
          <ul className="admin-products-title">
            <li className="title-name">product name</li>
            <li className="title-price">price</li>
            <li className="title-actions">actions</li>
          </ul>
          <ul className="admin-products-body">
            {products?.map((product) => (
              <li key={product.id}>
                <div className="details">
                  <NavLink to={`/products/${product.id}`}>
                    <p>{product.name}</p>
                  </NavLink>
                </div>
                <span>${product.price}</span>
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
          <AddProduct />
          {productToUpdate && (
            <Modal
              isOpen={productToUpdate}
              onClose={() => setProductToUpdate(null)}
            >
              <Suspense fallback={<h1>Loading...</h1>}>
                <UpdateProduct
                  product={productToUpdate}
                  closeFn={setProductToUpdate}
                />
              </Suspense>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleProducts;
