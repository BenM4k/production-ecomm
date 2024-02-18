import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/slices/authSlice/authSlice";
import { setMessage } from "../../redux/slices/users/userSlice";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formData[name] = value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      dispatch(setMessage("Registration Successful, Please Login"));
      setFormData({});
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.title = "Register";
  });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
        <input type="email" name="email" onChange={handleChange} />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" name="password" onChange={handleChange} />
      </label>
      <label htmlFor="first_name">
        First Name
        <input type="text" name="first_name" onChange={handleChange} />
      </label>
      <label htmlFor="last_name">
        Last Name
        <input type="text" name="last_name" onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUp;
