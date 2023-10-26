import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { makeRequest } from "../../axios";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";
import { AuthContext } from "../../context/authContext";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    clas: "",
  });
  const queryClient = new QueryClient()
  const { register } = useContext(AuthContext);

  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isLoading, error, data } = useQuery(["faculties"], () =>
    makeRequest.get("/classes").then((res) => {
      return res.data;
    })
  );

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErr(null)
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (inputs.username === "" || inputs.email === "" || inputs.clas === "" || inputs.password === "") {
      setErr("Fill all the fields")
    }
    else {
      setLoading(true);
      try {
        await register(inputs)
        await new Promise((resolve) => setTimeout(resolve, 0));
        navigate("/login");
      } catch (err) {
        console.log(err);
        if (err.response)
          setErr(err.response.data);
        else
          setErr(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="register">
        <div className="card">
          {loading && <Loader lColor={"white"} dColor={"white"} />}
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
                autoComplete="email"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <select name="clas" onChange={handleChange} value={inputs.clas}>
                <option value="">Select Class</option>
                {isLoading ? "Loading" :
                  data ? data.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name} - {option.dept}
                    </option>
                  )) : error + "error"
                }
              </select>
              <p style={{ color: "red", fontSize: "small" }}>{err && err}</p>
              <button onClick={handleClick}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Register;
