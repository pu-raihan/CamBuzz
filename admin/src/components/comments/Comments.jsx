import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Comments = ({ postid }) => {
  const { currentUser } = useContext(AuthContext);
  const [ desc, setDesc ] = useState("");

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postid=" + postid).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postid });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/profile/"+currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="Add a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Share</button>
      </div>
      {isLoading
        ? "loading..."
        : data.map((comment) => (
            <div className="comment" key={comment.cid}>
               <Link
                to={`/profile/${comment.username}`}
              ><img src={"/profile/"+comment.profilePic} alt="" />
              </Link><div className="info">
                <span>{comment.username}</span>
                <p>{comment.desc}</p>{error&&error}
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
