import { NavLink } from "react-router-dom";
import { AiOutlineGithub, AiOutlineTwitter, AiFillPhone } from "react-icons/ai";
import logo from "../assets/logo_3.svg";
import { BsInstagram, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const about = ["Shop", "FAQ", "Contact Us", "Returns", "Shipping"];
  const customerSupport = [
    "Terms & Conditions",
    "Privacy Policy",
    "Cookie Policy",
    "Sitemap",
    "Blog",
  ];
  const affiliate = [
    "Become a Seller",
    "Careers",
    "Press",
    "Investor Relations",
    "Advertise",
  ];
  return (
    <div className="footer-container">
      <div className="head">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="lists">
          <ul className="about">
            <h3>About Us</h3>
            {about.map((item) => (
              <li key={item}>
                <NavLink>{item}</NavLink>
              </li>
            ))}
          </ul>
          <ul className="about">
            <h3>Cstomer Support</h3>
            {customerSupport.map((item) => (
              <li key={item}>
                <NavLink>{item}</NavLink>
              </li>
            ))}
          </ul>
          <ul className="about">
            <h3>Affiliate Program</h3>
            {affiliate.map((item) => (
              <li key={item}>
                <NavLink>{item}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="subscribe">
          <h3>Subscribe</h3>
          <p>Join our community to stay updated on new products and offers.</p>
          <br />
          <input type="text" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className="foot">
        <p>© 2023 Benny&apos;s. All rights reserved.</p>
        <p>Privacy policy</p>
        <p>Terms of service</p>
        <p>Cookies settings</p>
        <ul className="socials">
          <li>
            <NavLink to="https://www.github.com/BenM4k">
              <AiOutlineGithub />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://www.twitter.com/_____anomaly">
              <AiOutlineTwitter />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://www.instagram.com/_b_mak_">
              <BsInstagram />
            </NavLink>
          </li>
          <li>
            <NavLink to="https://www.linkedin.com/in/benedict-makomo">
              <BsLinkedin />
            </NavLink>
          </li>
          <li>
            <NavLink to="tel:+250784702911">
              <AiFillPhone />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
