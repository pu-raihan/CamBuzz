
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
      <div className="write flex items-center justify-between my-5">
        <img className="w-10 h-10 rounded-full object-cover" src={"/profile/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          autoFocus
          className="focus:ring-bgSoft p-2.5 w-3/5 xs:w-3/4 bg-transparent border-0 border-b focus:border-bg4 dark:text-white focus:rounded"
          placeholder="Add a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="sharebtn group inline-flex relative bg-btn dark:bg-dbtn rounded overflow-hidden cursor-pointer" onClick={handleClick}>
          <span className="p-1.5 z-10 text-white">Share</span>
          <span className="absolute z-0 top-0 left-0 w-32 h-32 transition-all duration-500 ease-in-out rotate-45 -translate-x-32 -translate-y-20 bg-rose-800 group-hover:translate-x-0 group-hover:rotate-90 group-active:bg-black group-active:opacity-50"></span>
        </div>
      </div>
      {comments?.map((comment) => (
        <div className="comment my-7 flex justify-between items-center dark:text-white gap-5" key={comment.cid}>
          <Link
            to={`/profile/${comment.username}`}
          ><img className="w-10 h-10 rounded-full object-cover" src={"/profile/" + comment.profilePic} alt="" />
          </Link>
          <div className="info flex-5 flex flex-col gap-1 items-start">
            <Link
              to={`/profile/${comment.username}`}
            ><span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{comment.username}</span>
            </Link>
            <p className="">{comment.desc}</p>
          </div>
          <span className="date flex-2 self-center text-gray-600 dark:text-gray-400 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
