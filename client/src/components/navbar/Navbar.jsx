import "./navbar.scss";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import NightMode from '@mui/icons-material/DarkModeRounded';
import LightMode from '@mui/icons-material/LightModeRounded';
import SearchIcon from "@mui/icons-material/SearchOutlined";
import AccountIcon from '@mui/icons-material/Person2Outlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {

  const { toggle,darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
        {darkMode?<img src="/lightLogo.png"/>:<img src="/dark.png"/>}
        </Link>
        <HomeIcon />
        {darkMode?<LightMode onClick={toggle}/>:<NightMode onClick={toggle}/>}
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <AccountIcon />
        <EmailIcon />
        <NotificationsIcon />
        <div className="user">
            <img src={"/"+currentUser.profilePic} alt="" />
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
