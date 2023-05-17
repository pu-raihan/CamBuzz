import { useState } from "react";
import "./editClass.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CloseIcon from '@mui/icons-material/CloseRounded';

const EditClass = ({ classname,setEditOpen }) => {

  const [texts, setTexts] = useState({
    name:classname,
    faculty: "",
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
      return makeRequest.put("/classes", clas);
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
    setEditOpen(false);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Edit class</h1>
        <form>
          <label>Faculty</label>
          <select name="faculty" onChange={handleChange} value={texts.faculty}>
            {faculties?.map((option) => (
              <option key={option.uId} value={option.username}>
                {option.fullname}
              </option>
            ))}
          </select>{err && err}
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <button className="close" onClick={() => setEditOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default EditClass;
