import { NavLink } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <>
        <NavLink to={`/products/${product.id}`}>
            <img src={product.img} alt={product.title} />
            <div className="detail">
                <p>{product.title}</p>
                <p>${product.price}</p>
            </div>
        </NavLink>
        <button>Add to Cart</button>
    </>
  )
}

export default Product