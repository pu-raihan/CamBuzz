import "./navbar.scss";
import NightMode from "@mui/icons-material/DarkModeRounded";
import LightMode from "@mui/icons-material/LightModeRounded";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import PowerIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import AccountIcon from '@mui/icons-material/PermIdentityOutlined';
// import HomeIcon from "@mui/icons-material/HomeOutlined";
// import EmailIcon from "@mui/icons-material/EmailOutlined";
// import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Dialog from "../dialog/Dialog";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [profOpen, setProfOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
 
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [err, setErr] = useState(null);

  const gotoProf = () => {
    navigate("/profile/"+currentUser.username);
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
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <div className="profcard" onClick={() => setProfOpen(!profOpen)}>
          {profOpen && (
            <div className="profil">
              <div className="goto" onClick={() =>gotoProf()}>
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
    </div>
  );
};

export default Navbar;
