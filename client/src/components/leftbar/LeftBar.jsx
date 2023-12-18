import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PrinterIcon from '@mui/icons-material/Print';
import FoodIcon from '@mui/icons-material/LocalDining';
import ToiletIcon from '@mui/icons-material/Wc';
import ChatIcon from '@mui/icons-material/ChatRounded';
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
        <Link to="/chats" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="relative hidden sm:flex nm:hidden group opacity-90 hover:opacity-100 p-3 rounded-full items-center justify-center gap-2 bg-bg2 dark:bg-dbg2 overflow-hidden">
            <span className="absolute z-0 top-0 left-0 w-56 h-64 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-72 -translate-y-24 bg-rose-300 dark:bg-rose-800 opacity-60 group-hover:-translate-x-8"></span>
            <ChatIcon className='z-10 transition ease-in group-hover: duration-200' />
            <span className='z-10 text-sm transition ease-in group-hover:font-semibold duration-100'>Goto Chats</span>
          </div>
        </Link>
        <Link to="/resources" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="flex flex-col">
            <span className='text-xs py-2.5'>Find in PU</span>
            <div className="flex group opacity-90 hover:opacity-100 py-2.5 items-center gap-2.5">
              <WaterDropIcon className='transition ease-in group-hover:scale-125 duration-200' />
              <span className='text-sm transition ease-in group-hover:scale-110 group-hover:font-semibold duration-100'>Water Resources</span>
            </div>
            <div className="flex group opacity-90 hover:opacity-100 py-2.5 items-center gap-2.5">
              <PrinterIcon className='transition ease-in group-hover:scale-125 duration-200' />
              <span className='text-sm transition ease-in group-hover:scale-110 group-hover:font-semibold duration-100'>Printers</span>
            </div>
            <div className="flex group opacity-90 hover:opacity-100 py-2.5 items-center gap-2.5">
              <FoodIcon className='transition ease-in group-hover:scale-125 duration-200' />
              <span className='text-sm transition ease-in group-hover:scale-110 group-hover:font-semibold duration-100'>Food Outlets</span>
            </div>
            <div className="flex group opacity-90 hover:opacity-100 py-2.5 items-center gap-2.5">
              <ToiletIcon className='transition ease-in group-hover:scale-125 duration-200' />
              <span className='text-sm transition ease-in group-hover:scale-110 group-hover:font-semibold duration-100'>Toilets</span>
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
                  <div className="flex opacity-80 hover:opacity-100 items-center gap-2.5" key={event.id}>
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
