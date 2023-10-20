import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
// import "./login.scss";
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
    <div className="h-screen flex items-center justify-center bg-loginbg">
      <div className="shadow-lg relative flex flex-col sm:flex-row min-h-[500px] sm:h-3/5 w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 rounded-2xl bg-gradient-to-r from-[#fff1f1] to-[#f7e7e7] overflow-hidden">
        {loading && <Loader lColor={"white"} dColor={"white"} />}
        <div className="flex sm:flex-1 sm:flex-col justify-center p-5 sm:p-12 gap-5 sm:gap-8 text-white" style={{ background: 'linear-gradient(#38011a8e, #47002e92), url("/loginbg.jpg") center', backgroundSize: 'cover' }}>
          <img className="w-20 sm:w-3/5 md:w-1/2" src="/lightLogo.png" alt="" />
          <p className="text-xxs sm:text-sm">
            An exclusive Social Media partner and Resource locator for pondicherry University.
          </p>
          <div className="flex flex-col gap-2 sm:gap-8">
            <span className="text-xxs sm:text-xs">Don't you have an account?</span>
            <Link to="/register">
              <button className="w-full sm:w-24 p-2.5 border-none rounded-md text-sm font-bold bg-btnlight text-btn1 hover:bg-rose-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">Register</button>
            </Link>
          </div>
        </div>
        <div className="right flex flex-1 sm:flex-1 flex-col justify-center p-12 gap-6 sm:gap-8">
          <h1 className="text-stone-600 text-3xl font-black">Login</h1>
          <form className="flex flex-col gap-2.5" onSubmit={handleLogin}>
            <input
              className="text-sm px-2.5 py-5 bg-transparent placeholder:text-slate-500 border-gray-600 border-b"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              autoComplete="username"
            />
            <input
              className="text-sm px-2.5 py-5 bg-transparent placeholder:text-slate-500 border-gray-600 border-b"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <div className="flex gap-4 my-2">
              <input type="checkbox" id="checkbox1" className="peer relative h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-sm border bg-white after:absolute after:left-0 after:top-0 after:h-full after:w-full
              after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] 
              after:bg-[length:35px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-pink-950 focus:outline-none"
                checked={checked}
                onChange={() =>
                  setChecked(!checked)
                } />
              <label for="checkbox1" className="cursor-pointer text-sm text-gray-700 peer-checked:text-gray-500 "> Are you a faculty ? </label>
            </div>
            <button className="w-1/2 p-2.5 border-none bg-btn2 hover:bg-btn1 text-white text-sm font-bold" onClick={handleLogin}>Login</button>
            <p className="text-gray-500 text-sm pl-1 cursor-pointer hover:text-gray-800" onClick={handleGuestLogin}>Guest Login</p>
            <p className="text-red-500 text-xs">{err && err}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
