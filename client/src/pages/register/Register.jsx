import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null)
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://cambuzz-api.onrender.com/api/auth/register", inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <img src="/lightLogo.png" alt="" />
          <p>
            An exclusive Social Media partner and Resource locator for pondicherry University.
          </p>
          <div className="log">
            <span>Already have an account?</span>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <p style={{ color: "red", fontSize: "small" }}>{err && err}</p>
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
