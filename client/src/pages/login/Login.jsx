import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);


  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null);
  };

  const { login } = useContext(AuthContext);
  const { facLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (checked) {
      try {
        await facLogin(inputs);
        navigate("/");
      } catch (err) {
        setErr(err.response.data);
      }
    }
    else {
      try {
        console.log("login1");
        await login(inputs);
        console.log("login2");
        navigate("/");
      } catch (err) {
        setErr(err.response.data);
      }
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
          <div className="reg">
            <span>Don't you have an account?</span>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <label className="fac">
              <input
                type="checkbox"
                onChange={handleCheck} />Are you a faculty?
              <span className="checkmark"></span>
            </label>
            <button onClick={handleLogin}>Login</button>
            <p style={{ color: "red", fontSize: "small" }}>{err && err}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
