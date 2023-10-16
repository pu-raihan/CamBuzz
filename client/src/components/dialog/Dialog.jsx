import "./dialog.scss";
import CloseIcon from "@mui/icons-material/CloseRounded";
// import { useState } from "react";
// import Loader from '../loader/Loader';

const Dialog = ({ setDialogOpen, dFunction, value, qst }) => {

  // const [isLoading, setLoading] = useState(false);

  return (
    <div className="dialog">
      {/* {isLoading && <Loader size={30} lColor={"white"} dColor={"white"} />} */}
      <div className="wrapper">
        <h1>{qst + ''}{value && value}</h1>
        <div className="buttons">
          <button onClick={() => setDialogOpen(false)}>Cancel</button>
          <button onClick={() => { dFunction(); setDialogOpen(false) }} >Proceed</button>
        </div>
        <button className="close" onClick={() => setDialogOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Dialog;