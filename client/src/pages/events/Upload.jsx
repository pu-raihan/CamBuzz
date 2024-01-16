import { useEffect, useRef, useState } from "react";
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
    if (currentUser.type !== "guest") {
      let imgUrl = "";
      if (file) imgUrl = await upload();
      mutation.mutate({ ...texts, img: imgUrl, type: currentUser.type });
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
      <div ref={divRef} className="wrapper dark:text-white m-auto w-full xs:w-3/4 h-full xs:h-3/4 lg:w-1/2 p-10 pr-2 bg-bg1 dark:bg-dbg1 flex flex-col max-xs:justify-center shadow-2xl relative">
        <h1 className="text-xl pb-5 font-semibold">Create new event</h1>
        <form className="flex flex-col gap-4 overflow-y-scroll pr-5">
          <div className="file flex flex-wrap">
            <label className="" htmlFor="stryFile">
              <span>Event Poster</span>
              <div className="imgContainer relative">
                <img
                  className="w-24 h-24 object-cover"
                  src={file && URL.createObjectURL(file)} alt="" />
                <CloudUploadIcon className="absolute top-0 right-0 bottom-0 left-0 m-auto text-3xl text-gray-800 dark:text-gray-200 shadow-lg cursor-pointer" />
              </div>
            </label>
            <input
              type="file"
              id="stryFile"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="inputs flex flex-col [&>label]:pt-3 [&>input]:bg-transparent focus:[&>*]:ring-0 focus:[&>input]:border-rose-900 [&>label]:text-sm [&>label]:text-gray-700 [&>label]:dark:text-gray-300">
            <label>Name of the event</label>
            <input
              className="p-2 border-0 border-b"
              type="text"
              value={texts.desc}
              name="desc"
              onChange={handleChange}
            />
            <label>Date</label>
            <input
              className="p-2 border-0 border-b text-gray-500"
              type="date"
              value={texts.date}
              name="date"
              onChange={handleChange}
            />
            <label>Venue</label>
            <input
              className="p-2 border-0 border-b"
              type="text"
              name="venue"
              value={texts.venue}
              onChange={handleChange}
            />
          </div>
          <button className="bg-dbtn hover:bg-dbg4 p-2.5 text-white" onClick={handleClick}>Share</button>
        </form>
        <button className="close absolute top-5 right-5 dark:text-white transition ease-in hover:rotate-90 duration-100" onClick={() => setUploadOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Upload;