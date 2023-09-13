import "./menubar.scss";
import WidgetsIcon from '@mui/icons-material/Widgets';
import EventIcon from '@mui/icons-material/EventNoteRounded';
import ChatIcon from '@mui/icons-material/ChatRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReqIcon from '@mui/icons-material/PendingActions';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import Notification from "../notification/Notification";

const Menubar = () => {

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const gotoRes = () => {
    navigate("/resources");
  }
  const gotoChat = () => {
    navigate("/chats");
    window.location.reload();
  }
  const gotoEvents = () => {
    navigate("/events");
    window.location.reload();
  }
  const gotoRequests = () => {
    navigate("/requests");
    window.location.reload();
  }

  return (
    <div className="menubar">
      <div className="item" onClick={gotoRes}>
        <WidgetsIcon />

      </div>
      <div className="item" onClick={gotoChat}>
        <ChatIcon />
      </div>
      <div className="item" onClick={gotoEvents}>
        <EventIcon />
      </div>
      <div className="item">
        <NotificationsIcon onClick={() => setNotificationOpen(true)} />
      </div>
      {currentUser.type === 'faculty' &&
        <div className="item" onClick={gotoRequests}>
          <ReqIcon />
        </div>
      }
      {notificationOpen && <Notification setNotificationOpen={setNotificationOpen} qst="Do you really wanna logout?" />}
    </div>
  );
};

export default Menubar;
