import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./faculty.scss";
import { makeRequest } from "../../axios";
import MoreIcon from "@mui/icons-material/MoreVertRounded";
import { useState } from "react";
import Dialog from "../../components/dialog/Dialog";
import { useNavigate } from "react-router";
const Faculty = ({faculty}) => {

  const [moreOpen, setMoreOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const delMutation = useMutation(
    (username) => {
      return makeRequest.delete("/users/" + username);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
  const navigate = useNavigate();

  const handleDelete = () => {
    delMutation.mutate(faculty.username);
    navigate("/")
  };

  return (
    <div className="faculty" key={faculty.uId}>
      <div className="left">
        <span>{faculty.uId}</span>
        <div className="name">
          <p>{faculty.username}</p>
          <p>{faculty.fullname}</p>
        </div>
        <span>{faculty.email}</span></div>
      <div className="right">
        <MoreIcon style={{ fontSize: "x-large" }} onClick={() => setMoreOpen(!moreOpen)} />
        {moreOpen && (
          <div className="buttons">
            <button onClick={() => setDialogOpen(true)}>Delete</button>
            <button>Chat</button>
          </div>
        )}
      </div>
      {dialogOpen && <Dialog setDialogOpen={setDialogOpen} dFunction={handleDelete} qst="Do you really wanna delete this faculty?" fac={faculty.username} />}
    </div>
  )
}

export default Faculty;
