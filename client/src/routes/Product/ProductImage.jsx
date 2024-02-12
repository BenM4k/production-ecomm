import phone from "../../assets/phone_1.png";

const ProductImage = ({ product }) => {
  return (
    <>
      <div className="first">
        <img src={phone} alt={product?.title} />
      </div>
      <div>
        <img src={phone} alt={product?.title} />
      </div>
      <div>
        <img src={phone} alt={product?.title} />
      </div>
      <div>
        <img src={phone} alt={product?.title} />
      </div>
      <div>
        <img src={phone} alt={product?.title} />
      </div>
      <div>
        <img src={phone} alt={product?.title} />
      </div>
    </>
  );
};

export default ProductImage;
