import "./navbar.scss";
import NightMode from "@mui/icons-material/DarkModeRounded";
import LightMode from "@mui/icons-material/LightModeRounded";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import PowerIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import AccountIcon from '@mui/icons-material/PermIdentityOutlined';
// import HomeIcon from "@mui/icons-material/HomeOutlined";
// import EmailIcon from "@mui/icons-material/EmailOutlined";
import CloseIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ReqIcon from '@mui/icons-material/PendingActions';
import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import Dialog from "../dialog/Dialog";
import Notification from "../notification/Notification";
import Loader from "../loader/Loader";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [profOpen, setProfOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState();

  const [searchText, setSearchText] = useState();
  const [err, setErr] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const gotoProf = (username) => {
    if (username) {
      navigate("/profile/" + username);
      window.location.reload();
    } else {
      navigate("/profile/" + currentUser.username);
      window.location.reload();
    }
    setResultOpen(false)
  }

  const gotoRequests = () => {
    navigate("/requests");
    window.location.reload();
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setErr(err.response.data);
    }
    navigate("/");
  };

  const handleChange = async (e) => {
    if (e.target.value) {
      setSearchText(e.target.value);
      try {
        setLoading(true);
        const res = await makeRequest.get("/search/" + e.target.value);
        setData(res.data);
      } catch (error) {
        if (error.response.status === 409) {
          setError(error.response.data);
          setData(null);
        }
        console.log(error.response.data);
      }
    }
    else {
      setData(null);
      setSearchText(undefined);
    }
    setLoading(false);
  };

  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const refDiv = document.getElementById('refDiv');

    if (refDiv) {
      const rect = refDiv.getBoundingClientRect();
      setWidth(rect.width);
      setLeft(rect.left);
    }
  }, []);

  return (
    <div className="navbar sticky flex items-center justify-between top-0 h-28 px-5 py-4 bg-bg1 dark:bg-dbg1 dark:text-white border-b border-border1 dark:border-dborder1 z-999">
      <div className="left flex items-center gap-3 sm:gap-5">
        <Link to="/" className="no-underline w-[60px] h-[50px] object-cover">
          {darkMode ? (
            <img className="" src="/lightLogo.png" alt="CamBuzz" />
          ) : (
            <img src="/dark.png" alt="CamBuzz" />
          )}
        </Link>
        <div className="hidden xs:block">
          {darkMode ? (
            <LightMode className='transition ease-in hover:scale-110 duration-200' onClick={toggle} />
          ) : (
            <NightMode className='transition ease-in hover:scale-110 duration-200' onClick={toggle} />
          )}
        </div>
        <div id="refDiv" className="search flex items-center border border-border1 dark:border-dborder1 rounded-full sm:rounded-md px-1.5 py-1 gap-2.5"
          onFocus={() => setResultOpen(true)}
          onBlur={() => { setTimeout(() => setResultOpen(true), 1000) }} >

          <SearchIcon />
          <input
            className="bg-transparent flex border-none w-36 xs:w-36 sm:w-64 text-xs sm:text-sm font-light focus:outline-none"
            type="text"
            name="search"
            value={searchText}
            onChange={handleChange} placeholder="Search..." />
          {resultOpen &&
            <div className={`results absolute flex flex-col gap-0.5 sm:gap-2 items-center justify-start z-998 px-0 pt-2.5 pb-5 overflow-scroll no-scrollbar overflow-x-auto top-20 max-h-[40vh] sm:max-h-[60vh] min-h-[4vh] rounded-lg bg-bgTrans border-2 border-border1 dark:border-dborder1 text-white text-xs sm:text-sm`} style={{ left: left, width: width }} >
              <div className="close flex w-11/12 text-zinc-300 items-center text-xs justify-between">
                {loading && <Loader size={25} lColor={"white"} dColor={"white"} />}
                <span className="text-xxs sm:text-xs">{data && searchText && data.length + " results"} </span>
                <CloseIcon style={{ fontSize: 'medium' }} onClick={() => { setData(null); setResultOpen(false) }} />
              </div>
              {searchText ? data ? data.map((result) =>
                <div className={`result flex items-center justify-between w-11/12 p-1 sm:p-4 rounded-full sm:rounded-xl ${result.type === 'faculty' ? 'bg-bg4' : 'bg-dbgGrey'}`} key={result.id} onClick={() => gotoProf(result.username)}>
                  <img className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full" src={"/profile/" + result.profilePic} alt="" />
                  <div className="usr items-center justify-around w-1/2 overflow-hidden">
                    <p className="name overflow-hidden text-zinc-300 ">{result.username}</p>
                    <p className="fulname hidden sm:block text-xs font-light text-zinc-400">{result.fullname}</p>
                  </div>
                  <p className="type text-[10px] text-zinc-400 hidden sm:block">{result.type}</p>
                  <ArrowForwardIcon className=" scale-75 justify-self-end text-zinc-400" />
                </div>) : loading ? 'Loading' : error : `Search users`}
            </div>}
        </div>
      </div>
      <div className="hidden xs:flex xs:flex-1 px-5 items-center justify-start gap-5">
        {currentUser.type === 'faculty' &&
          <ReqIcon onClick={gotoRequests} />
        }
        <NotificationsIcon className="hover:animate-wiggle" onClick={() => setNotificationOpen(true)} />
      </div>
      <div className="right flex items-center justify-end gap-5 text-white">
        <div className="group profcard flex items-center gap-2.5 relative md:static flex-col-reverse md:flex-row md:shadow-md rounded-full p-1 sm:p-3 sm:pl-5 bg-transparent md:bg-gradient-to-r from-bg2 to-bg3 dark:from-dbg2 dark:to-dbg3" onMouseOver={() => setProfOpen(true)} onMouseLeave={() => setProfOpen(false)}>
          <div className={`${profOpen ? "animate-openL" : "animate-closeL"} profil absolute md:static flex-col items-center top-20 gap-1 bg-transparent text-xs`}>
            <div className="transition ease-in hover:scale-105 duration-100 hover:font-semibold w-full flex items-center justify-center p-1 md:p-1.5 gap-1 rounded-full bg-btn2 dark:bg-dbtn text-white" onClick={() => gotoProf()}>
              <AccountIcon style={{ fontSize: 'medium' }} />
              <span className={`${profOpen ? "animate-openIcons" : "animate-closeIcons"}`}>Profile</span>
            </div>
            <div className="transition ease-in hover:scale-105 duration-100 hover:font-semibold w-full flex items-center justify-center p-1 md:p-1.5 gap-1 rounded-full bg-btn2 dark:bg-dbtn text-white" onClick={() => setDialogOpen(true)}>
              <PowerIcon style={{ fontSize: 'medium' }} />
              <span className={`${profOpen ? "animate-openIcons" : "animate-closeIcons"}`}>Logout</span>
            </div>
            <div className="flex xs:hidden transition ease-in hover:scale-105 duration-100 hover:font-semibold w-full items-center justify-center p-1 md:p-1.5 gap-1 rounded-full bg-btn2 dark:bg-dbtn text-white" onClick={toggle}>
              {darkMode ? (
                <LightMode style={{ fontSize: "medium" }} className='transition ease-in hover:scale-110 duration-200' />
              ) : (
                <NightMode style={{ fontSize: "medium" }} className='transition ease-in hover:scale-110 duration-200' />
              )}
              <span className={`${profOpen ? "animate-openIcons" : "animate-closeIcons"}`}>Theme</span>
            </div>
          </div>
          {err && err.response.data}
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex md:max-nm:group-hover:hidden flex-col items-start text-black dark:text-white font-bold gap-1">
              <span>{currentUser.username}</span>
              <p className="text-xxs font-normal truncate">{currentUser.fullname}</p>
            </div>
            <img className="w-16 h-16 rounded-full object-cover border-2 md:border-none border-black dark:border-white" src={"/profile/" + currentUser.profilePic} alt="" />
          </div>
        </div>
      </div>
      {dialogOpen && <Dialog setDialogOpen={setDialogOpen} dFunction={handleLogout} qst="Do you really wanna logout?" />}
      {notificationOpen && <Notification setNotificationOpen={setNotificationOpen} qst="Do you really wanna logout?" />}
    </div>
  );
};

export default Navbar;
