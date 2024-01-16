import { useEffect, useRef, useState } from "react";
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
      console.log("trying to upload");
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

  const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setUploadOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setUploadOpen, divRef]);

  return (
    <div className="upload fixed flex top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-999">
      <div ref={divRef} className="wrapper dark:text-white m-auto w-full xs:w-1/2 h-full xs:h-3/4 lg:w-2/5 p-10 pr-2 bg-bg1 dark:bg-dbg1 flex flex-col items-center justify-center max-xs:justify-center shadow-2xl relative">
        <h1 className="text-xl pb-5 font-semibold">Post your story</h1>
        <form className="flex flex-col items-center gap-5 w-full h-full">
          <div className="stryfiles flex flex-wrap w-full h-full">
            <label className="w-full h-full" htmlFor="stryFile">
              <div className="imgContainer relative w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  src={file && URL.createObjectURL(file)} alt="" />
                <CloudUploadIcon className="absolute top-0 left-0 right-0 bottom-0 m-auto text-3xl text-gray-200 shadow-lg cursor-pointer" />
              </div>
            <input
              type="file"
              id="stryFile"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            </label>
          </div>
          <button className="bg-dbtn hover:bg-dbg4 p-2.5 text-white w-full" onClick={handleClick}>Share</button>
        </form>
        <button className="close absolute top-5 right-5 dark:text-white transition ease-in hover:rotate-90 duration-100" onClick={() => setUploadOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Upload;