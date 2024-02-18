import pic from "../../assets/phone_1.png";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      <h3>Order items</h3>
      <ul>
        {products?.map((product) => (
          <li key={product.product.id}>
            <img src={pic} alt={`${product.product.name}'s picture`} />
            <p>{product.product.name}</p>
            <p>
              ({product.quantity}) items X ${product.product.price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
