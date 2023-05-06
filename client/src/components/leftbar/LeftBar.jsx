// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PrinterIcon from '@mui/icons-material/Print';
import FoodIcon from '@mui/icons-material/LocalDining';
import ToiletIcon from '@mui/icons-material/Wc';
import "./leftBar.scss";
import { Link } from "react-router-dom";

const LeftBar = () => {
  // const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container"> 
        <Link to="/resources" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="menu">
       <span>Find in PU</span>
          <div className="item">
            <WaterDropIcon />
            <span>Water Resources</span>
          </div>
          <div className="item">
            <PrinterIcon />
            <span>Printers</span>
          </div>
          <div className="item">
            <FoodIcon />
            <span>Food Outlets</span>
          </div>
          <div className="item">
            <ToiletIcon />
            <span>Toilets</span>
          </div>
        </div></Link>
        <hr />
        <div className="menu">
          <span>Events</span>
          <div className="item">
            <img src="/prof.jpg" alt="" />
            <span>Football Tournament</span>
          </div>
          <div className="item">
            <img src="/space.jpg" alt="" />
            <span>Webinar - Astro physics</span>
          </div>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Dance Competition</span>
          </div>
          <div className="item">
            <img src="/strange.jpg" alt="" />
            <span>Semester end examinations</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
export default LeftBar;
