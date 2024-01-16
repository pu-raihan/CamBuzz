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
    const res = await makeRequest.post("/upload", formData)
    return res.data
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
        imgUrl = await upload()
        console.log("image" + imgUrl);
        mutation.mutate({ desc, img: imgUrl, type: currentUser.type })
        setDesc("");
        setFile(null);
      }
    }
  }

  return (
    <div className="share shadow-lg mb-5 bg-bg1 dark:bg-dbg1 dark:text-white rounded-2xl">
      <div className="p-5">
        <div className="top flex items-center justify-between">
          <div className="left flex items-center flex-3">
            <img className="w-12 h-12 rounded-full object-cover" src={"/profile/" + currentUser.profilePic} alt="" />
            <textarea
              className="px-5 w-full bg-transparent text-sm sm:text-base resize-none border-none outline-none overflow-scroll no-scrollbar focus:ring-0"
              maxLength="400"
              type="text"
              placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right flex justify-end">
            {file && (
              <img className="file w-24 h-24 object-cover" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr className="my-5 h-[0.5px] border-0 bg-border1 dark:bg-dborder1" />
        <div className="bottom flex items-center justify-between">
          <div className="left flex items-center gap-5">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="flex items-center gap-2.5 cursor-pointer">
                <Image />
                <span className="text-xs text-gray-500">Add Image</span>
              </div>
            </label>
          </div>
          <div className="sharebtn group inline-flex relative bg-btn dark:bg-dbtn rounded overflow-hidden cursor-pointer" onClick={handleClick}>
            <span className="p-1.5 z-10 text-white">Share</span>
            <span className="absolute z-0 top-0 left-0 w-32 h-32 transition-all duration-500 ease-in-out rotate-45 -translate-x-32 -translate-y-20 bg-rose-800 group-hover:translate-x-0 group-hover:rotate-90 group-active:bg-black group-active:opacity-50"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
