import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./class.scss";
import { makeRequest } from "../../axios";
import MoreIcon from "@mui/icons-material/MoreVertRounded";
import { useState } from "react";
import Dialog from "../../components/dialog/Dialog";
import { useNavigate } from "react-router";
import EditClass from "../../components/editClass/EditClass";
const Class = ({clas}) => {
 
  const [moreOpen, setMoreOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [classname, setClass] = useState();

  const queryClient = useQueryClient();

  const delMutation = useMutation(
    (clasname) => {
      return makeRequest.delete("/classes/" + clasname);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
  const navigate = useNavigate();

  const edit = (name) => {
    setClass(name)
    setEditOpen(true)
    setMoreOpen(false)
  }
    const handleDelete = () => {
    delMutation.mutate(clas.name);
    navigate("/")
  };

  return (
    <div className="class" key={clas.uId}>
      <div className="left">
        <span>{clas.id}</span>
        <div className="name">
          <p>{clas.name}</p>
          <p>{clas.faculty}</p>
        </div>
        <span>{clas.email}</span></div>
      <div className="right">
        <MoreIcon style={{ fontSize: "x-large" }} onClick={() => setMoreOpen(!moreOpen)} />
        {moreOpen && (
          <div className="buttons">
            <button onClick={() => edit(clas.name)}>Edit</button>
            <button onClick={() => setDialogOpen(true)}>Delete</button>
          </div>
        )}
      </div>
      {dialogOpen && <Dialog setDialogOpen={setDialogOpen} dFunction={handleDelete} qst="Do you really wanna delete this clas?" fac={clas.username} />}
      {editOpen && <EditClass classname={classname} setEditOpen={setEditOpen} />}
    </div>
  )
}

export default Class;
