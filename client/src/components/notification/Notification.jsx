import "./notification.scss";
import CloseIcon from "@mui/icons-material/CloseRounded";

const Notification = ({ setNotificationOpen, dFunction, value, qst }) => {

  return (
    <div className="notification">
      <div className="wrapper">
        <h1>No notifications</h1>
        <button className="close" onClick={() => setNotificationOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Notification;