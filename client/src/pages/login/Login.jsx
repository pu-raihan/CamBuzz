import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
 
  const navigate = useNavigate();
 
  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null)
  };

  const { login } = useContext(AuthContext);
  const { facLogin } = useContext(AuthContext);
  const { guestLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    if (checked) {
      try {
        await facLogin(inputs);
        await new Promise((resolve) => setTimeout(resolve, 0));
        navigate("/");
        window.location.reload();
      } catch (err) {
        setErr(err.response.data);
      } finally {
        setLoading(false);
      }
    }
    else {
      try {
        await login(inputs);
        await new Promise((resolve) => setTimeout(resolve, 0));
        navigate("/");
        window.location.reload();
      } catch (err) {
        setErr(err.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await guestLogin({ username: "guest", password: "773008guest" });
      await new Promise((resolve) => setTimeout(resolve, 0));
      navigate("/");
      window.location.reload();
    } catch (err) {
      //setErr(err.response.data);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="card">
        {loading && <Loader lColor={"white"} dColor={"white"} />}
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
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <label className="fac">
              <input
                type="checkbox"
                onChange={handleCheck} />Are you a faculty?
              <span className="checkmark"></span>
            </label>
            <button onClick={handleLogin}>Login</button>
            <p style={{ color: "grey", fontSize: "small", paddingLeft: "5px", fontWeight: "400", cursor: "pointer" }} onClick={handleGuestLogin}>Guest Login</p>
            <p style={{ color: "red", fontSize: "small" }}>{err && err}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
