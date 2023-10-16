import { useState } from "react";
import "./upload.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/CloseRounded";

const Upload = ({ setUploadOpen, currentUser }) => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/storyupload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/stories", newStory);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("upload started");
    if (currentUser.type !== "guest") {
      let imgUrl = "";
      if (file) imgUrl = await upload();
      console.log("image uploaded");
      mutation.mutate({ img: imgUrl, type: currentUser.type });
      console.log("upload completed");
      setFile(null);
      setUploadOpen(false)
    }
  };

  return (
    <div className="stryupload">
      <div className="wrapper">
        <h1>Post Your Story</h1>
        <form>
          <div className="stryfiles">
            <label htmlFor="stryFile">
              <div className="imgContainer">
                <img
                  src={file && URL.createObjectURL(file)} alt="" />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="stryFile"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button onClick={handleClick}>Share</button>
        </form>
        <button className="close" onClick={() => setUploadOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Upload;