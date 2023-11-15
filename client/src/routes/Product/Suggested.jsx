import { NavLink } from "react-router-dom"
const Suggested = ({suggested}) => {
  return (
    <>
        <h2>In the same category</h2>
            <ul>
              {suggested?.slice(0, 4).map((product) => (
                <li key={product?.id}>
                  <NavLink to={`/products/${product.id}`}>
                    <img src={product?.img} alt={product.title} />
                    <p>{product.title}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
    </>
  )
}

export default Suggested