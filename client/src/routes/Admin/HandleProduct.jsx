import { useSelector } from "react-redux";
import { selectProductsResult } from "../../redux/slices/products/productSlice";
import { useDeleteProductMutation } from "../../redux/slices/products/productSlice";
import { FiDelete } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import AddProduct from "../../components/adders/AddProduct";
import { useState } from "react";
import UpdateProduct from "../../components/modals/UpdateProduct";

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
    <>
      <div>
        <div className="dash-head">
          <h2>Products List</h2>
          <ul>
            {products?.map((product) => (
              <li key={product.id}>
                <p>{product.name}</p>
                <div className="buttons">
                  <button
                    className="btn-2"
                    onClick={() => setProductToUpdate(product)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-2"
                    onClick={() => handleDelete(product?.id)}
                  >
                    <FiDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="add-product">
          <AddProduct />
        </div>
      </div>
      <div className="update-product">
        {productToUpdate && (
          <UpdateProduct
            product={productToUpdate}
            closeFn={setProductToUpdate}
          />
        )}
      </div>
    </>
  );
};

export default HandleProducts;
