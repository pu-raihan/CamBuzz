import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./faculties.scss";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import BackIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useState } from "react";
import Faculty from "../faculty/Faculty";
import AddFaculty from "../../components/addFaculty/AddFaculty";
const Faculties = () => {

  const { isLoading, error, data } = useQuery(["faculties"], () =>
    makeRequest.get("/faculties").then((res) => {
      return res.data;
    })
  );
  const [updateOpen, setUpdateOpen] = useState(false);


  return (
    <div className="faculties">
      <div className="top">
        <button>
          <Link
            to={"/"}
          ><BackIcon style={{ fontSize: "14px" }} />Back</Link></button>
        <span>Faculties List</span>
      </div>

      <div className="card">
        {error
          ? "Something went wrong!"
          : isLoading
            ? "loading..."
            : data[0] ? data.map((faculty) => (
              <Faculty faculty={faculty} key={faculty.uId} />
            )) : <span style={{ margin: "auto" }}>No faculties in database</span>
        }
        <div className="add" onClick={() => setUpdateOpen(true)}>
          <p> + </p> Add a Faculty
        </div>
      </div>

      {updateOpen && <AddFaculty setUpdateOpen={setUpdateOpen} user={data} />}
    </div>
  );
};

export default Faculties;
