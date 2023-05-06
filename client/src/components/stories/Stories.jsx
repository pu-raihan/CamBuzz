import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Upload from "../storyUpload/Upload";

const Stories = ({ username }) => {
  const { currentUser } = useContext(AuthContext);
  const [uploadOpen, setUploadOpen] = useState(false);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories?username=" + username).then((res) => {
      return res.data;
    })
  );

  
  return (
    <div className="stories">
      <div className="story">
        <img src={"/profile/" + currentUser.profilePic} alt="" />
       <button onClick={()=>setUploadOpen(true)}>+</button>
      </div>
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading stories"
        : data.map((story) => (
            <div className="story" key={story.sid}>
              <img src={"/stories/" + story.img} alt="" />
              <span>{story.username}</span>
            </div>
          ))}
      {uploadOpen && <Upload setUploadOpen={setUploadOpen} user={data} />}
    </div>
  );
};

export default Stories;
