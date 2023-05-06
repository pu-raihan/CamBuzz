import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PrinterIcon from '@mui/icons-material/Print';
import FoodIcon from '@mui/icons-material/LocalDining';
import ToiletIcon from '@mui/icons-material/Wc';
import HealthIcon from '@mui/icons-material/HealthAndSafety';
import AtmIcon from '@mui/icons-material/LocalAtm';
import SchoolIcon from '@mui/icons-material/School';
import HostelIcon from '@mui/icons-material/Apartment';
import BusIcon from '@mui/icons-material/DirectionsBus';
import LabIcon from '@mui/icons-material/Science';
import LibraryIcon from '@mui/icons-material/AutoStories';
import GymIcon from '@mui/icons-material/FitnessCenter';
import "./resources.scss"
import { useNavigate } from "react-router-dom";

const Resources = () => {

    const navigate = useNavigate();

    const handleClick = (targetRes) => {
        navigate("/resources/" + targetRes)
        window.location.reload();

    };
    return (
        <div className="resources">
            <h1>Find In PU</h1>

            <div className="list">
                <div className="item" name="water" onClick={() => handleClick("water")}>
                    <WaterDropIcon /> <span>Water Sources</span>
                </div>
                <div className="item" name="printer" onClick={() => handleClick("printer")}>
                    <PrinterIcon />  <span>Printers</span>
                </div>
                <div className="item" name="toilet" onClick={() => handleClick("toilet")}>
                    <ToiletIcon /> <span>Toilets / Washrooms</span>
                </div>
                <div className="item" name="food" onClick={() => handleClick("food")}>
                    <FoodIcon /> <span>Food Outlets</span>
                </div>
                <div className="item" name="health" onClick={() => handleClick("health")}>
                    <HealthIcon /> <span>Health Center</span>
                </div>
                <div className="item" name="atm" onClick={() => handleClick("atm")}>
                    <AtmIcon />  <span>ATM / Bank</span>
                </div>
                <div className="item" name="dept" onClick={() => handleClick("dept")}>
                    <SchoolIcon />   <span>Departments</span>
                </div>
                <div className="item" name="hostel" onClick={() => handleClick("hostel")}>
                    <HostelIcon />  <span>Hostels</span>
                </div>
                <div className="item" name="bus" onClick={() => handleClick("bus")}>
                    <BusIcon />  <span>Bus Stops</span>
                </div>
                <div className="item" name="lab" onClick={() => handleClick("lab")}>
                    <LabIcon />  <span>Labs</span>
                </div>
                <div className="item" name="library" onClick={() => handleClick("library")}>
                    <LibraryIcon />   <span>Reading Rooms / Libraries</span>
                </div>
                <div className="item" name="gym" onClick={() => handleClick("gym")}>
                    <GymIcon /> <span>Gyms</span>
                </div>
            </div>
        </div>
    );
};
export default Resources;