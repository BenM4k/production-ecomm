import HomeBanner from "./HomeBanner";
import HomeCategories from "./HomeCategories";
import HomeProducts from "./HomeProducts";
import phone from "../../assets/phone_2.png";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Dream Sale";
  });
  return (
    <section className="home">
      <div className="banner">
        <HomeBanner />
      </div>
      <div className="discover">
        <div className="left">
          <h2 className="title">Discover a word of Shopping Delight</h2>
          <p>
            Experience hassle-free shopping with a wide range of products and
            seamless user experience.
          </p>
          <p>
            <span className="discount">50% OFF</span>
            <br />
            Shop now and save big on your favorite items!
          </p>
          <button className="btn-primary">Learn more</button>
        </div>
        <img src={phone} alt="some image" />
      </div>
      <div className="home-categories">
        <HomeCategories />
      </div>
      <div className="featured">
        <HomeProducts />
      </div>
      <div className="testimonial">
        <div className="stars">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <h3>
          Our experience with this e-commerce website has been amazing. The
          platform is user-friendly and the customer support is top-notch.
        </h3>
        <div className="brand">
          <img src="" alt="" />
          <p>John Doe</p>
          <p>ABC, Company</p>
          <div className="">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
