import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PrinterIcon from '@mui/icons-material/Print';
import FoodIcon from '@mui/icons-material/LocalDining';
import ToiletIcon from '@mui/icons-material/Wc';
import "./leftBar.scss";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import Loader from "../loader/Loader";

const LeftBar = () => {
  const { isLoading, error, data } = useQuery(["events"], () =>
    makeRequest.get("/events").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="leftBar hidden sm:flex flex-3 sticky top-[112px] h-[calc(100vh-112px)] bg-bg1 dark:bg-dbg1 dark:text-white overflow-scroll no-scrollbar">
      <div className="container p-5">
        <Link to="/resources" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="flex flex-col gap-5">
            <span className='text-xs'>Find in PU</span>
            <div className="flex items-center gap-2.5">
              <WaterDropIcon className='transition ease-in hover:scale-110 duration-200' />
              <span className='text-sm transition ease-in hover:scale-110 hover:font-semibold duration-100'>Water Resources</span>
            </div>
            <div className="flex items-center gap-2.5">
              <PrinterIcon className='transition ease-in hover:scale-110 duration-200' />
              <span className='text-sm transition ease-in hover:scale-110 hover:font-semibold duration-100'>Printers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FoodIcon className='transition ease-in hover:scale-110 duration-200' />
              <span className='text-sm transition ease-in hover:scale-110 hover:font-semibold duration-100'>Food Outlets</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ToiletIcon className='transition ease-in hover:scale-110 duration-200' />
              <span className='text-sm transition ease-in hover:scale-110 hover:font-semibold duration-100'>Toilets</span>
            </div>
          </div></Link>
        <hr className='my-5 mx-0 border-none h-[0.4px] bg-border1 dark:bg-dborder1' />
        <Link to="/events" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="flex flex-col relative gap-5">
            <span className='text-xs'>Events</span>
            {error
              ? "Something went wrong!"
              : isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                : data.length ? data.map((event) =>
                  <div className="flex items-center gap-2.5" key={event.id}>
                    <img className='w-8 h-8 object-cover' src={"/events/" + event.img} alt="" />
                    <span className='text-sm'>{event.desc}</span>
                  </div>
                ) : <div className="noData">No Events</div>}
          </div>
        </Link>
        <hr className='my-5 mx-0 border-none h-[0.4px] bg-border1 dark:bg-dborder1' />
      </div>
    </div>
  );
};
export default LeftBar;
