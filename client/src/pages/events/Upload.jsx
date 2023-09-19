import { useState } from "react";
import "./upload.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/CloseRounded";

const Upload = ({ setUploadOpen, currentUser }) => {
  const [file, setFile] = useState(null);
  const [texts, setTexts] = useState({
    username: currentUser.username,
    desc: '',
    venue: '',
    date: '',
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(texts);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/eventupload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newEvent) => {
      return makeRequest.post("/events", newEvent);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["events"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    if (!currentUser.type === "guest") {
      let imgUrl = "";
      if (file) imgUrl = await upload();
      mutation.mutate({ ...texts, img: imgUrl, type: currentUser.type });
      setFile(null);
      setUploadOpen(false)
    }
  };

  return (
    <div className="upload">
      <div className="wrapper">
        <h1>Create new event</h1>
        <form>
          <div className="inputs">
            <div className="files">
              <label htmlFor="stryFile">
                <div className="imgContainer">
                  <img
                    src={file && URL.createObjectURL(file)} alt="" />
                  <CloudUploadIcon className="icon" />
                </div>
              </label>
            </div>
            <div className="inputboxes">
              <label>Name of the event</label>
              <input
                type="text"
                value={texts.desc}
                name="desc"
                onChange={handleChange}
              />
              <label>Date</label>
              <input
                type="date"
                value={texts.date}
                name="date"
                onChange={handleChange}
              />
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={texts.venue}
                onChange={handleChange}
              />
              <input
                type="file"
                id="stryFile"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div></div>
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