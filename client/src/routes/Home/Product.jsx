import { NavLink } from 'react-router-dom'
import { addToCart } from '../../redux/slices/users/userSlice'
import { useDispatch } from 'react-redux'
import phone from '../../assets/phone_1.png'

const Product = ({ product }) => {
  const dispatch = useDispatch()
  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod))
  }

  return (
    <>
        <NavLink to={`/products/${product.id}`}>
            <img src={phone} alt={product.name} />
            <div className="detail">
                <p>{product.name}</p>
                <p>${product.price}</p>
            </div>
        </NavLink>
        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </>
  )
}

export default Product