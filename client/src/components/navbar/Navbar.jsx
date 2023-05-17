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
import { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import Dialog from "../dialog/Dialog";
import Notification from "../notification/Notification";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [profOpen, setProfOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState();

  const [searchText, setSearchText] = useState();
  const [err, setErr] = useState(null);
  const [data, setData] = useState(null);

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
    navigate("/login");
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
    makeRequest.get("/search/" + e.target.value).then((res) => {
      setData(res.data)
    }).catch(error => {
      if (error.response.status === 409)
        setData(null)
      console.log(error);
    });
  };

  const div1Ref = useRef(null);
  const [div1Width, setDiv1Width] = useState(0);
  const [distanceFromLeft, setDistanceFromLeft] = useState(0);

  useEffect(() => {
    const rect = div1Ref.current.getBoundingClientRect();
    const width = div1Ref.current.clientWidth;
    setDistanceFromLeft(rect.left);
    setDiv1Width(width);
  }, []);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          {darkMode ? (
            <img src="/lightLogo.png" alt="CamBuzz" />
          ) : (
            <img src="/dark.png" alt="CamBuzz" />
          )}
        </Link>
        {darkMode ? (
          <LightMode onClick={toggle} />
        ) : (
          <NightMode onClick={toggle} />
        )}
        <div className="search" ref={div1Ref}>
          <SearchIcon />
          <input
            type="text"
            name="search"
            value={searchText}
            onFocus={() => setResultOpen(true)}
            onChange={handleChange} placeholder="Search..." />
        </div>
      </div>
      <div className="mid">
        {currentUser.type === 'faculty' &&
          <ReqIcon onClick={gotoRequests} />
        }
        <NotificationsIcon onClick={() => setNotificationOpen(true)} />
      </div>
      <div className="right">
        <div className="profcard" onClick={() => setProfOpen(!profOpen)}>
          {profOpen && (
            <div className="profil">
              <div className="goto" onClick={() => gotoProf()}>
                <AccountIcon style={{ fontSize: "medium" }} />

                <span>Profile</span>

              </div>
              <div className="logout" onClick={() => setDialogOpen(true)}>
                <PowerIcon style={{ fontSize: "medium" }} />
                <span>Logout</span>
              </div>
            </div>
          )}
          {err && err}
          <div className="prof">
            <div className="user">
              <span>{currentUser.username}</span>
              <p>{currentUser.fullname}</p>
            </div>
            <img src={"/profile/" + currentUser.profilePic} alt="" />
          </div>
        </div>
      </div>
      {dialogOpen && <Dialog setDialogOpen={setDialogOpen} dFunction={handleLogout} qst="Do you really wanna logout?" />}
      {notificationOpen && <Notification setNotificationOpen={setNotificationOpen} qst="Do you really wanna logout?" />}
      {resultOpen &&
        <div className="results" style={{ left: distanceFromLeft, width: div1Width }}>
          <div className="close"> <span>{data &&data.length+" results"} </span>
          <CloseIcon style={{fontSize:"medium"}} onClick={()=>setResultOpen(false)}/></div>
          {searchText ? data ?data.map((result) =>
            <div className={result.type === 'faculty' ? "result faculty" : "result"} key={result.id} onClick={() => gotoProf(result.username)}>
              <img src={"/profile/" + result.profilePic} alt="" />
              <p className="name">{result.username}</p>
              <p className="type">{result.type}</p>
              <ArrowForwardIcon style={{ right: "0" }} className="arrowForward"/>
            </div>) : `No results found for '${searchText}'!` : `Search users`}
        </div>}
    </div>
  );
};

export default Navbar;
