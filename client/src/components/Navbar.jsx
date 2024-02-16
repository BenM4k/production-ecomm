import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo_3.svg";
import { selectCurrentUser, selectCart } from "../redux/slices/users/userSlice";
import { memo } from "react";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const cart = useSelector(selectCart);
  const links = [
    {
      name: "about",
      path: "/about",
    },
    {
      name: "store",
      path: "/store",
    },
    {
      name: "categories",
      path: "/categories",
    },
  ];
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <NavLink to={link.path}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="nav-logo" />
        </NavLink>
      </div>
      <ul>
        {user !== null ? (
          <>
            {user?.role === "ADMIN" && (
              <li>
                <NavLink to="/admin">admin</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/cart" className={"cart"}>
                cart{" "}
                <span className={cart.length ? "cart-total" : ""}>
                  {cart.length ? cart.length : ""}
                </span>
              </NavLink>
            </li>
            <li className="cta">
              <NavLink to={`/profile/:${user?.first_name}`}>
                {user?.first_name}
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">login</NavLink>
            </li>
            <li className="cta">
              <NavLink to="/register">sign up</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default memo(Navbar);
