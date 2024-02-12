import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slices/authSlice/authSlice";
import { setCredentials } from "../../redux/slices/users/userSlice";
import { selectCurrentMessage } from "../../redux/slices/users/userSlice";

import { setError } from "../../redux/slices/notifications/notif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const loginMessage = useSelector(selectCurrentMessage);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password: pwd }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPwd("");
      setErr("");
      navigate(from, { replace: true });
    } catch (err) {
      // Handle login error
      if (!err.data) {
        dispatch(setError("No server response"));
      } else if (err.data.message) {
        dispatch(setError(err.data.message));
      } else if (err.data.type) {
        dispatch(setError("Add valid email and/or password"));
      } else {
        dispatch(setError("Something went wrong"));
      }
    }
  };
  return (
    <>
      <h1>Login</h1>
      <h3>{loginMessage ? loginMessage : ""}</h3>
      <form onSubmit={handleSubmit}>
        <h3>{err}</h3>
        <label>email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="">password</label>
        <input
          type="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign in</button>
        <br />
      </form>
    </>
  );
};

export default Login;
