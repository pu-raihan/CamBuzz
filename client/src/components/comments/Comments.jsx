import "./comments.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Comments = ({ postid, comments }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

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
    if (currentUser.type !== "guest") {
      mutation.mutate({ desc, postid });
      setDesc("");
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick(event);
    }
}

  return (
    <div className="comments w-full">
      <div className="write">
        <img src={"/profile/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          autoFocus
          className="focus:ring-bgSoft"
          placeholder="Add a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={handleKeyPress}
          />
        <button onClick={handleClick}>Share</button>
      </div>
      {comments?.map((comment) => (
        <div className="comment" key={comment.cid}>
          <Link
            to={`/profile/${comment.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          ><img src={"/profile/" + comment.profilePic} alt="" />
          </Link><div className="info">
            <span>{comment.username}</span>
            <p>{comment.desc}</p>
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
