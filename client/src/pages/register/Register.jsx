import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { makeRequest } from "../../axios";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    clas: "",
  });
  const queryClient = new QueryClient()

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (inputs.username === "" || inputs.email === "" || inputs.clas === "" || inputs.password === "") {
      setErr("Fill all the fields")
    }
    else {
      setLoading(true);
      try {
        await axios.post(`${process.env.REACT_APP_SERVER_ADD}/api/auth/register`, inputs);
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
      <div className="h-screen flex items-center justify-center bg-loginbg">
        <div className="shadow-lg relative flex flex-col-reverse sm:flex-row-reverse min-h-[500px] sm:h-3/5 w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 rounded-2xl bg-gradient-to-r from-[#fff1f1] to-[#f7e7e7] overflow-hidden">
          {loading && <Loader lColor={"white"} dColor={"white"} />}
          <div className="left flex sm:flex-1 sm:flex-col justify-center p-5 sm:p-12 gap-5 sm:gap-8 text-white" style={{ background: 'linear-gradient(#38011a8e, #47002e92), url("/loginbg.jpg") center', backgroundSize: 'cover' }}>
            <img className="w-20 sm:w-3/5 md:w-1/2" src="/lightLogo.png" alt="" />
            <p className="text-xxs sm:text-sm">
              An exclusive Social Media partner and Resource locator for pondicherry University.
            </p>
            <div className="flex flex-col gap-2 sm:gap-8">
              <span className="text-xxs sm:text-xs">Already have an account?</span>
              <Link to="/login">
                <button className="w-full sm:w-24 p-2.5 border-none rounded-md text-sm font-bold bg-btnlight text-btn hover:bg-rose-300 transition ease-in-out hover:scale-105 duration-300">Login</button>
              </Link>
            </div>
          </div>
          <div className="right flex flex-1 sm:flex-1 flex-col justify-center p-12 gap-6 sm:gap-8">
            <h1 className="text-stone-600 text-3xl font-black">Register</h1>
            <form className="flex flex-col gap-2.5 focus:[&>input]:outline-none focus:[&>input]:ring-0 focus:[&>input]:border-bg4 [&>input]:border-0 [&>input]:border-b" onSubmit={handleRegister}>
              <input
                className="text-sm px-2.5 py-5 bg-transparent placeholder:text-slate-500 border-gray-600 border-b"
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                autoComplete="username"
              />
              <input
                className="text-sm peer px-2.5 py-5 bg-transparent placeholder:text-slate-500 border-gray-600 border-b invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                type="email"
                placeholder="Email"
                name="email"
                autocomplete="email"
                onChange={handleChange}
              />
              <span className="peer-valid:hidden peer-[&:not(:focus):not(:placeholder-shown):invalid]:block text-xs text-red-500">Please provide a valid email address</span>
              <input
                className="text-sm peer px-2.5 py-5 bg-transparent placeholder:text-slate-500 border-gray-600 border-b invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                type="password"
                placeholder="Password"
                name="password"
                autocomplete="current-password"
                onChange={handleChange}
                pattern=".{6,}"
              />
              <span className="peer-valid:hidden peer-[&:not(:focus):not(:placeholder-shown):invalid]:block text-xs text-red-500">Password should be atleast 6 characters</span>
              <select className="text-sm px-2 py-5 bg-transparent focus:outline-none focus:ring-0 focus:border-bg4 border-0 border-b" name="clas" onChange={handleChange} value={inputs.clas}>
                <option className="text-sm px-2.5 py-4 bg-transparent" value="">Select Class</option>
                {isLoading ? "Loading" :
                  data ? data.map((option) => (
                    <option className="text-sm px-2.5 py-4 bg-transparent" key={option.id} value={option.name}>
                      {option.name} - {option.dept}
                    </option>
                  )) : error + "error"
                }
              </select>
              <p className="text-red-500 text-xs">{err && err}</p>
              <button className="w-1/2 p-2.5 border-none text-white text-sm font-bold bg-btn hover:bg-dbtn transition ease-in-out hover:scale-105 duration-300" onClick={handleRegister}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Register;
