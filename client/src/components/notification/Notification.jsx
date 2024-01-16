import { useEffect, useRef } from "react";
import "./notification.scss";
import CloseIcon from "@mui/icons-material/CloseRounded";

const Notification = ({ setNotificationOpen, dFunction, value, qst }) => {
  
  const divRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setNotificationOpen,divRef]);

  return (
    <div className="notification fixed flex top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-999">
      <div ref={divRef} className="wrapper m-auto w-3/4 h-1/3 xs:h-1/2 sm:w-1/2 p-5 bg-bg1 dark:bg-dbg1 flex flex-col items-center justify-evenly shadow-2xl overflow-scroll relative no-scrollbar">
        <h1>No notifications</h1>
        <button className="close absolute top-5 right-5 dark:text-white transition ease-in hover:rotate-90 duration-100" onClick={() => setNotificationOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Notification;