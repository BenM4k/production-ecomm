import { useSelector } from "react-redux";
import { selectCategoriesResult } from "../../redux/slices/category/category";
import phone from "../../assets/phone_3.png";

const HomeCategories = () => {
  const categories = useSelector(selectCategoriesResult)?.data?.categories;
  return (
    <>
      <h2 className="title">Explore Our Exciting Categories and Promotions</h2>
      <p>
        Find the best deals and hottest products in our wide range of
        categories. Take advantage of our limited-time promotions to save big on
        your favorite items.
      </p>
      <ul className="list">
        {categories?.slice(0, 3)?.map((item) => (
          <li key={item.id}>
            <img src={phone} alt="" />
            <h3>{item.name}</h3>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomeCategories;
