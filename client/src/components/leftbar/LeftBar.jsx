import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PrinterIcon from '@mui/icons-material/Print';
import FoodIcon from '@mui/icons-material/LocalDining';
import ToiletIcon from '@mui/icons-material/Wc';
import "./leftBar.scss";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../../axios";

const LeftBar = () => {
  const { isLoading, error, data } = useQuery(["events"], () =>
    makeRequest.get("/events").then((res) => {
      return res.data;
    })
  );
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
        <Link to="/events" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="menu">
            <span>Events</span>
            {error
              ? "Something went wrong!"
              : isLoading
                ? "loading events"
                : data.length ? data.map((event) =>
                  <div className="item" key={event.id}>
                    <img src={"/events/"+event.img} alt="" />
                    <span>{event.desc}</span>
                  </div>
                ):<div className="noData">No Events</div>}
          </div>
          </Link>
        <hr />
      </div>
    </div>
  );
};
export default LeftBar;
