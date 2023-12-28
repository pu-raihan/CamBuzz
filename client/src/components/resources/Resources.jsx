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
import { useEffect } from 'react';

const Resources = ({ currRes }) => {

    const navigate = useNavigate();

    const handleClick = (targetRes) => {
        navigate("/resources/" + targetRes);
    };

    useEffect(() => {
        const targetDivById = document.getElementById(currRes);
        if (targetDivById) {
            targetDivById.style.filter = 'brightness(1.3)'
            targetDivById.style.transform = 'scale(1.05)';
            setTimeout(() => {
                targetDivById.style.filter = ''; 
                targetDivById.style.transform = '';
            }, 300);
        }

    }, [currRes])

    return (
        <div className="resources h-[calc(100vh-192px)] sm:h-[calc(100vh-112px)] flex flex-col items-center justify-center xs:gap-5 bg-bgSoft dark:bg-dbgSoft">
            <h1 className='text-sm xs:text-2xl px-2 pt-2 xs:font-semibold text-gray-600 dark:text-gray-300' >Find in PU</h1>
            <div className="flex flex-row p-2 justify-center gap-2 flex-wrap overflow-scroll no-scrollbar">
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" id="water" onClick={() => handleClick("water")}>
                    <WaterDropIcon /> <span>Drinking Water</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" id="printer" onClick={() => handleClick("printer")}>
                    <PrinterIcon />  <span>Printers</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" id="toilet" onClick={() => handleClick("toilet")}>
                    <ToiletIcon /> <span>Toilets / Washrooms</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" id="food" onClick={() => handleClick("food")}>
                    <FoodIcon /> <span>Food Outlets</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" name="health" onClick={() => handleClick("health")}>
                    <HealthIcon /> <span>Health Center</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" name="atm" onClick={() => handleClick("atm")}>
                    <AtmIcon />  <span>ATM / Bank</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" name="dept" onClick={() => handleClick("dept")}>
                    <SchoolIcon />   <span>Departments</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" name="hostel" onClick={() => handleClick("hostel")}>
                    <HostelIcon />  <span>Hostels</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" name="bus" onClick={() => handleClick("bus")}>
                    <BusIcon />  <span>Bus Stops</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" name="lab" onClick={() => handleClick("lab")}>
                    <LabIcon />  <span>Labs</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" name="library" onClick={() => handleClick("library")}>
                    <LibraryIcon />   <span>Reading Rooms / Libraries</span>
                </div>
                <div className="item w-[45%] xs:w-auto flex items-center shadow-lg gap-2.5 p-6 dark:text-white bg-bgGrey dark:bg-dbgGrey rounded-lg transition ease-in duration-75 hover:scale-105 hover:bg-zinc-500 hover:text-white dark:hover:bg-zinc-900 active:bg-zinc-900 cursor-pointer" name="gym" onClick={() => handleClick("gym")}>
                    <GymIcon /> <span>Gyms</span>
                </div>
            </div>
        </div>
    );
};
export default Resources;
