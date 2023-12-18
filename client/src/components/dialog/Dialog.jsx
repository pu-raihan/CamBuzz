import "./dialog.scss";
import CloseIcon from "@mui/icons-material/CloseRounded";
// import { useState } from "react";
// import Loader from '../loader/Loader';

const Dialog = ({ setDialogOpen, dFunction, value, qst }) => {

  // const [isLoading, setLoading] = useState(false);

  return (
    <div className="dialog fixed flex top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-999">
      {/* {isLoading && <Loader size={30} lColor={"white"} dColor={"white"} />} */}
      <div className="wrapper m-auto w-3/4 h-1/3 xs:h-1/2 sm:w-1/2 p-5 bg-bg1 dark:bg-dbg1 flex flex-col items-center justify-evenly shadow-2xl overflow-scroll relative no-scrollbar">
        <h1 className="text-center font-semibold text-base xs:text-lg">{qst + ''}{value && value}</h1>
        <div className="buttons flex items-center justify-evenly w-full text-white">
          <div className="cancel p-2.5 bg-btn dark:bg-dbtn group inline-flex cursor-pointer relative overflow-hidden" onClick={() => setDialogOpen(false)}>
            <span className="z-10">Cancel</span>
            <span class="absolute z-0 top-0 left-0 w-56 h-64 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-72 -translate-y-24 bg-black opacity-30 group-hover:-translate-x-8"></span>
          </div>
          <div className="proceed p-2.5 bg-red-600 dark:bg-red-900 group inline-flex relative overflow-hidden cursor-pointer" onClick={() => { dFunction(); setDialogOpen(false) }} >
            <span className="z-10">Proceed</span>
            <span class="absolute z-0 top-0 left-0 w-56 h-64 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-72 -translate-y-24 bg-red-900 dark:bg-red-600 opacity-60 group-hover:-translate-x-8"></span>
          </div>
        </div>
        <button className="close" onClick={() => setDialogOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Dialog;