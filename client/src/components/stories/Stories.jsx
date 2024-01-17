import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import ForwardIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from "@mui/icons-material/CloseRounded";
import Upload from "../storyUpload/Upload";
import Loader from "../loader/Loader";
import { Carousel } from 'flowbite-react';
import moment from "moment";

const Stories = ({ username }) => {
  const { currentUser } = useContext(AuthContext);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories?username=" + username + "&type=" + currentUser.type).then((res) => {
      return res.data;
    })
  );

  const handleImage = (index) => {
    setCurrentImageIndex(index);
    setImageOpen(true)
  }

  return (
    <div className="stories relative flex justify-start gap-2.5 sm:gap-5 p-2.5 mb-2 sm:mb-3 h-24 xs:h-28 sm:h-44 overflow-x-scroll no-scrollbar">
      <div className="story inline-block flex-none  w-[18%] sm:w-[calc(21%)] lg:w-[22%] xl:w-[calc(17%+1px)] rounded-xl overflow-hidden relative">
        <img className="w-full h-full object-cover" src={"/profile/" + currentUser.profilePic} alt="" />
        <button className="flex items-center justify-center text-3xl text-center absolute top-0 right-0 bottom-0 left-0 m-auto sm:right-auto sm:top-auto sm:bottom-2.5 sm:left-2.5 text-white bg-bg4 rounded-full bg-opacity-70 w-8 h-8 cursor-pointer transition ease-in-out hover:rotate-180 duration-300" onClick={() => setUploadOpen(true)}>
          <CloseIcon className="rotate-45"/>
        </button>
      </div>
      {error
        ? "Something went wrong!"
        : isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
          : data.map((story, index) => (
            <div className="story inline-block flex-none w-[18%] sm:w-[calc(21%)] lg:w-[22%] xl:w-[calc(17%+1px)] rounded-xl xs:rounded-2xl overflow-hidden relative" key={story.sid}>
              <img className="w-full h-full object-cover" src={`/public/stories/` + story.img} alt="" onClick={() => handleImage(story.img, index)} />
              <span className="absolute left-0 right-0 mx-auto w-fit bottom-1 sm:bottom-2 px-2 font-light text-center text-white text-xxs xs:text-xs shadow-md bg-bgTrans rounded-full">{story.username}</span>
            </div>
          ))}
      {imageOpen &&
        <div className="fixed h-screen z-999 w-screen top-0 left-0 bg-dbg1 sm:bg-opacity-70">
          <button className="absolute top-4 right-4 text-white z-999" onClick={() => setImageOpen(false) }>
            <CloseIcon />
          </button>
          <Carousel leftControl={
            <div className="leftctl hidden xs:inline-flex bg-zinc-400 hover:bg-zinc-200 w-11 h-11 bg-opacity-60 hover:bg-opacity-60 rounded-full items-center justify-center group cursor-pointer active:border-2">
              <BackIcon className="text-white dark:text-white" />
            </div>
          } rightControl={
            <div className="rightctl hidden xs:inline-flex bg-zinc-400 hover:bg-zinc-200 w-11 h-11 bg-opacity-60 hover:bg-opacity-60 rounded-full items-center justify-center group cursor-pointer active:border-2">
              <ForwardIcon className="text-white" />
            </div>
          } pauseOnHover indicators={false} slideInterval={10000}>
            {[...data.slice(currentImageIndex), ...data.slice(0, currentImageIndex)].map((story, index) => (
              <div key={index} className="h-screen py-5 flex flex-col items-center justify-center relative">
                <img className="max-h-screen sm:max-h-[80%] w-fit max-w-screen sm:max-w-[80%] object-cover rounded-xl" src={`${process.env.REACT_APP_SERVER_ADD}/public/stories/` + story.img} alt="" />
                <div className="usrdeets absolute bottom-6 sm:static flex flex-col p-3 items-center">
                  <span className="font-medium text-white text-xs sm:text-sm">{story.username}</span>
                  <span className="text-xxs text-zinc-300 dark:text-zinc-400 ">{moment(story.createdAt).fromNow()}</span>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      }
      {uploadOpen && <Upload setUploadOpen={setUploadOpen} currentUser={currentUser} />}
    </div>
  );
};

export default Stories;
