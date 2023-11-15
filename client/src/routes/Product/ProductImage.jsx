const ProductImage = ({product}) => {
  return (
    <>
        <div className="first"><img src={product?.img} alt={product?.title} /></div>
        <div><img src={product?.img} alt={product?.title} /></div>
        <div><img src={product?.img} alt={product?.title} /></div>
        <div><img src={product?.img} alt={product?.title} /></div>
        <div><img src={product?.img} alt={product?.title} /></div>
        <div><img src={product?.img} alt={product?.title} /></div>
    </>
  )
}

export default ProductImage