import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./classes.scss";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import BackIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useState } from "react";
import Class from "../class/Class";
import AddClass from "../../components/addClass/AddClass";
const Classes = () => {

  const { isLoading, error, data } = useQuery(["classes"], () =>
    makeRequest.get("/classes?username=undefined").then((res) => {
      return res.data;
    })
  );
  const [updateOpen, setUpdateOpen] = useState(false);


  return (
    <div className="classes">
      <div className="top">
        <button>
          <Link
            to={"/"}
          ><BackIcon style={{ fontSize: "14px" }} />Back</Link></button>
        <span>Classes List</span>
      </div>

      <div className="card">
        {error
          ? "Something went wrong!"
          : isLoading
            ? "loading..."
            : data[0] ? data.map((clas) => (
              <Class clas={clas} key={clas.id} />
            )) : <span style={{ margin: "auto" }}>No classes in database</span>
        }
        <div className="add" onClick={() => setUpdateOpen(true)}>
          <p> + </p> Add a Class
        </div>
      </div>

      {updateOpen && <AddClass setUpdateOpen={setUpdateOpen} user={data} />}
    </div>
  );
};

export default Classes;
