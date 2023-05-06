import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({username}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?username="+username).then((res) => {
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
