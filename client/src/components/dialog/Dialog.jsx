import "./dialog.scss";
import CloseIcon from "@mui/icons-material/CloseRounded";

const Dialog = ({ setDialogOpen, dFunction, value, qst }) => {

  return (
    <div className="dialog">
      <div className="wrapper">
        <h1>{qst}</h1>
        <div className="buttons">
          <button onClick={() => setDialogOpen(false)}>Cancel</button>
          <button onClick={() => dFunction(value)}>Proceed</button>
        </div>
        <button className="close" onClick={() => setDialogOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Dialog;