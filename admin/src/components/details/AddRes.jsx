import { useState } from "react";
import "./addRes.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloseIcon from '@mui/icons-material/CloseRounded';

const AddRes = ({ setUpdateOpen, resource }) => {

  const [texts, setTexts] = useState({
    resource: resource,
    name: "",
    avail: "1",
    remarks: "",
    x: "",
    y: "",
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: 
      e.target.value }));
    console.log(texts);
  };

  const queryClient = useQueryClient();
  const [err, setErr] = useState(null);

  const mutation = useMutation(
    (texts) => {
      return makeRequest.post("/resources", texts);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["resources"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ texts });

    setUpdateOpen(false);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Add new Resource</h1>
        <form>
          <label>Address of resource</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
          />
          <label>X Coordinate</label>
          <input
            type="number"
            name="x"
            onChange={handleChange}
          />
          <label>Y Coordinate</label>
          <input
            type="number"
            name="y"
            onChange={handleChange}
          />
          <select name="avail" onChange={handleChange} value={texts.avail}>
            <option key="1" value="1">
              Available
            </option>
            <option key="0" value="0">
              Not Available
            </option>
        </select>
          <label>Remarks</label>
          <input
            type="text"
            name="remarks"
            onChange={handleChange}
          />{err && err}
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <button className="close" onClick={() => setUpdateOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default AddRes;
