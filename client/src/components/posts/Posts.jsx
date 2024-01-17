
import Post from "../post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import Loader from "../loader/Loader";

const Posts = ({username}) => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?username="+username+"&type="+currentUser.type).then((res) => {
      return res.data;
    })
  );
  
  return (
    <div className="posts flex flex-col gap-5 no-scrollbar relative min-h-[20vh]">
      {error
        ? "Something went wrong!"
        : isLoading
        ?<Loader size={30} dColor={"white"} lColor={"#360913"} noBg={true}/>
        : data.map((post) => <Post post={post} key={post.postid} />)}
    </div>
  );
};

export default Posts;
