import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import {
  itemCountPlus,
  itemCountMinus,
} from "../../redux/slices/users/userSlice";
import { removeToCart } from "../../redux/slices/users/userSlice";
import phone from "../../assets/phone_1.png";
import { useDispatch } from "react-redux";
import CloseButton from "../../components/buttons/CloseButton";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <>
      <li key={product.id}>
        <div className="store-product">
          <img src={phone} alt={product.name} loading="lazy" />
          {product.name}
        </div>
        <div className="product-price">${product.price}</div>
        <div className="item-count">
          <button
            type="button"
            onClick={() => {
              product.itemCount === 1
                ? dispatch(removeToCart(product))
                : dispatch(itemCountMinus(product));
            }}
          >
            <AiOutlineMinus />
          </button>
          <span>{product.itemCount}</span>
          <button
            type="button"
            onClick={() => dispatch(itemCountPlus(product))}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <div className="product-total">
          ${product.price * product.itemCount}
        </div>
        <div className="delete-item">
          <CloseButton
            closeFn={() => {
              dispatch(removeToCart(product));
            }}
          />
        </div>
      </li>
    </>
  );
};

export default CartProduct;
