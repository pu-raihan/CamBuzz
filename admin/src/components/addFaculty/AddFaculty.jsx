import { useState } from "react";
import "./addFaculty.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloseIcon from '@mui/icons-material/CloseRounded';

const AddFaculty = ({ setUpdateOpen, user }) => {

  const [texts, setTexts] = useState();

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: 
      e.target.value }));
    console.log(texts);
  };

  const queryClient = useQueryClient();
  const [err, setErr] = useState(null);

  const mutation = useMutation(
    (faculty) => {
      return makeRequest.post("/faculties", faculty);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["faculties"]);
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
        <h1>Add new faculty</h1>
        <form>
          <label>Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
          />
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            onChange={handleChange}
          />
          <label>Department</label>
          <input
            type="text"
            name="dept"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
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
export default AddFaculty;
