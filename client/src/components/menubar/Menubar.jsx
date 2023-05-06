import "./menubar.scss";
// import NightMode from "@mui/icons-material/DarkModeRounded";
// import LightMode from "@mui/icons-material/LightModeRounded";
// import SearchIcon from "@mui/icons-material/SearchOutlined";
// import PowerIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import PrinterIcon from '@mui/icons-material/Print';
import EventIcon from '@mui/icons-material/EventNoteRounded';
import ChatIcon from '@mui/icons-material/ChatRounded';
// import AccountIcon from '@mui/icons-material/PermIdentityOutlined';
// import HomeIcon from "@mui/icons-material/HomeOutlined";
// import EmailIcon from "@mui/icons-material/EmailOutlined";
// import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
import {  useNavigate } from "react-router-dom";

const Menubar = () => {
 
  const navigate = useNavigate();

  const gotoRes = () => {
    navigate("/resources");
    window.location.reload();
  }

  return (
    <div className="menubar">
      <div className="item" onClick={gotoRes}>
        <PrinterIcon />
        <span>Resources</span>
      </div>
      <div className="item">
        <EventIcon />
        <span>Events</span>
      </div>
      <div className="item">
        <ChatIcon />
        <span>Chats</span>
      </div>
    </div>
  );
};

export default Menubar;
