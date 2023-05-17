import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Posts = ({username}) => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?username="+username+"&type="+currentUser.type).then((res) => {
      return res.data;
    })
  );
  
  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading posts"
        : data.map((post) => <Post post={post} key={post.postid} />)}
    </div>
  );
};

export default Posts;
