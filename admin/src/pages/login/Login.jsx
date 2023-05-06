import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null);
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }

  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <img src="/lightLogo.png" alt="" />
          <p>
            An exclusive Social Media partner and Resource locator for pondicherry University.
          </p>
        </div>
        <div className="right">
          <h1>Admin Login</h1>
          <form>
            <input
              type="text"
              placeholder="Admin mail"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            <button onClick={handleLogin}>Login</button>
            <p style={{ color: "red", fontSize: "small" }}>{err && err}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
