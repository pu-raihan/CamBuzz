import { useState } from "react";
import "./addClass.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CloseIcon from '@mui/icons-material/CloseRounded';

const AddClass = ({ setUpdateOpen }) => {

  const [texts, setTexts] = useState({
    name: "",
    faculty: "",
    dept: "",
  });

  const handleChange = (e) => {
    setTexts((prev) => ({
      ...prev, [e.target.name]:
        e.target.value
    }));
    console.log(texts);
  };

  const { isLoading, error, data:faculties } = useQuery(["faculties"], () =>
    makeRequest.get("/faculties").then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();
  const [err, setErr] = useState(null);

  const mutation = useMutation(
    (clas) => {
      return makeRequest.post("/classes", clas);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["classes"]);
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
        <h1>Add new class</h1>
        <form>
          <label>Class name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
          />
          <label>Faculty</label>
          <select name="faculty" onChange={handleChange} value={texts.faculty}>
            <option value="">Select Faculty</option>
            {faculties?.map((option) => (
              <option key={option.uId} value={option.username}>
                {option.fullname}
              </option>
            ))}
          </select>
          <label>Department</label>
          <input
            type="text"
            name="dept"
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
export default AddClass;
