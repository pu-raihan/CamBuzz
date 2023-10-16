import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from "@mui/icons-material/CloseRounded";
import Upload from "../storyUpload/Upload";
import Loader from "../loader/Loader";

const Stories = ({ username }) => {
  const { currentUser } = useContext(AuthContext);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false)
  const [image, setImage] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories?username=" + username + "&type=" + currentUser.type).then((res) => {
      return res.data;
    })
  );

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      setImageOpen(false);
    } else {
      const nextImage = data[currentImageIndex - 1].img;
      setImage(nextImage);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex === data.length - 1) {
      setImageOpen(false);
    } else {
      const nextImage = data[currentImageIndex + 1].img;
      setImage(nextImage);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleImage = (image, index) => {
    setImage(image)
    setCurrentImageIndex(index);
    setImageOpen(true)
  }

  return (
    <div className="stories">
      <div className="story">
        <img src={"/profile/" + currentUser.profilePic} alt="" />
        <button onClick={() => setUploadOpen(true)}>+</button>
      </div>
      {error
        ? "Something went wrong!"
        : isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
          : data.map((story, index) => (
            <div className="story" key={story.sid}>
              <img src={`${process.env.REACT_APP_SERVER_ADD}/public/stories/` + story.img} alt="" onClick={() => handleImage(story.img, index)} />
              <span>{story.username}</span>
            </div>
          ))}
      {imageOpen && <div className="imagebox">
        <BackIcon onClick={handlePrevImage} className="arrows" />
        <img src={`${process.env.REACT_APP_SERVER_ADD}/public/stories/` + image} alt="" />
        <button className="close" onClick={() => setImageOpen(false)}>
          <CloseIcon />
        </button>
        <ForwardIcon onClick={handleNextImage} className="arrows" />
      </div>}
      {uploadOpen && <Upload setUploadOpen={setUploadOpen} currentUser={currentUser} />}
    </div>
  );
};

export default Stories;
