import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../../redux/slices/order/orderSlice";
import ProductList from "./Product";
import { useEffect } from "react";

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetSingleOrderQuery(id);
  const order = data?.order;
  const user = order?.user;
  const shipping = order?.Shipping[0];
  const products = order?.OrderDetail;

  useEffect(() => {
    document.title = "Order Details";
  });
  if (isLoading)
    return (
      <div className="product-container">
        <h1>Loading...</h1>
      </div>
    );
  if (isError)
    return (
      <div className="product-container">
        <h1>Error getting product.</h1>
      </div>
    );

  return (
    <div className="orders-detail">
      <div className="detail-container">
        <div className="order-items">
          <ProductList products={products} />
          <div className="shipping-address">
            <h3>Shipping address</h3>
            <p>
              <span>Address: </span>
              {shipping.address}
            </p>
          </div>
        </div>
        <div className="order-info">
          <h3>Order info</h3>
          <p>
            <span>User: </span>
            {user.first_name} {user.last_name}
          </p>
          <p>
            <span>Total price: </span>${order.total_amount}
          </p>
          <p>
            <span>tracking number: </span>
            {shipping.tracking_number}
          </p>
          <div className="status">
            <p>{order.order_status}</p>
            <p>
              {shipping.status === "INPROGRESS"
                ? "IN-PROGRESS"
                : shipping.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
