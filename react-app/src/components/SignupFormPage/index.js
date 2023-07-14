import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {

        const formData = new FormData()

        formData.append("username", username)
        formData.append("email", email)
        formData.append("profile_pic", profilePic)
        formData.append("password", password)
        const data = await dispatch(signUp(formData))

        // const data = await dispatch(signUp(username, email, profilePic, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="signup-form-box">
        <div style={{ margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.5em", alignItems:"center"}}>
          <h1 className="title">Quiver</h1>
          <p>A place to share knowledge and better understand the world</p>
        </div>
        <div className="login-form">
          <h4>Sign up</h4>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
              Username
              <input
                type="text"
                value={username}
                minlength="4"                
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Profile Picture
              <input
                type="file"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                minlength="4"                
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                minlength="4"                
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
          <div className="signup-link">
            <NavLink to="/login">Already have an account? Login here</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;