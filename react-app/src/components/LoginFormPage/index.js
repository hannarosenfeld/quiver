import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserLogin = () => {
    return dispatch(login('demo@aa.io', "password")).then(() => closeModal())
  }

  return (
    <div className="login-form-wrapper">
      <div className="login-form-box">
        <div>
          <h1 className="title">Quiver</h1>
          <p>A place to share knowledge and better understand the world</p>
        </div>
        <div className="login-form">
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Log In</button>
            <div className="signup-link">
            <NavLink to="/signup">Sign up here</NavLink>
            </div>
          <button onClick={() => demoUserLogin()}>Demo User</button>
          </form>
      </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
