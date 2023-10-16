import "./share.scss";
import Image from '@mui/icons-material/ImageOutlined';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await makeRequest.post("/upload", formData).then(() => { return res.data }).catch(err => {
      return err;
    })
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    if (currentUser.type !== "guest") {
      let imgUrl = "";
      if (file) {
        imgUrl = await upload().then(() => {
          mutation.mutate({ desc, img: imgUrl, type: currentUser.type })
          setDesc("");
          setFile(null);
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/profile/" + currentUser.profilePic} alt="" />
            <textarea
              maxLength="400"
              type="text"
              placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <Image />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
