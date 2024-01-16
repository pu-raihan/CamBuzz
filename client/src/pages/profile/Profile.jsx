import "./profile.scss";
import FacebookIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import MoreIcon from "@mui/icons-material/MoreVertRounded";
import ClassIcon from '@mui/icons-material/Class';
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Loader from "../../components/loader/Loader";
import Dialog from "../../components/dialog/Dialog";

const Profile = () => {

  const [updateOpen, setUpdateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [optOutside, setOptOutside] = useState(false);

  const username = useLocation().pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/" + username).then((res) => {
      return res.data;
    })
  );

  const { isLoading: relLoading, data: relationData } = useQuery(
    ["relation"],
    () =>
      makeRequest.get("/relations?followed=" + username).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relations?username=" + username);
      return makeRequest.post("/relations", { username });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relation"]);
        setLoading(false)
      },
    }
  );

  const message = async (e) => {
    try {
      await makeRequest.post("/chats", {
        sender: currentUser.username,
        receiver: username,
        message: 'Hi',
        forum: false
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload()
    }
  };

  const handleFollow = () => {
    if (currentUser.type !== "guest") {
      setLoading(true)
      mutation.mutate(relationData.includes(currentUser.username));
    }
  };
  const optbarRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optbarRef.current && !optbarRef.current.contains(event.target)) {
        setMoreOpen(false);
        setOptOutside(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [optbarRef]);

  return (
    <div className="profile relative bg-bgSoft dark:bg-dbgSoft min-h-[calc(100vh-192px)] sm:min-h-[calc(100vh-112px)] overflow-scroll no-scrollbar">
      {isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
        : (
          <>
            <div className="images relative w-full h-[30vh] sm:h-[40vh]">
              <img src={"/cover/" + data.coverPic} alt="" className="w-full h-2/3 object-cover" />
              <img
                src={"/profile/" + data.profilePic}
                alt=""
                className="profilePic w-44 h-44 absolute rounded-full border-[6px] border-bgSoft dark:border-dbgSoft object-cover m-auto left-0 right-0 top-2/3 bottom-1/3"
              />
            </div>
            <div className="profileContainer p-3 xs:px-4 sm:pb-5 sm:px-8 xl:px-[70px] flex flex-col gap-3">
              <div className="uInfo relative flex flex-col items-center justify-evenly p-5 bg-bg1 dark:bg-dbg1 text-zinc-600 dark:text-zinc-300 h-[calc(70vh-216px)] sm:h-[calc(60vh-136px)] rounded-2xl">
                <div ref={optbarRef} className="absolute right-5 top-5">
                  <MoreIcon className="cursor-pointer " onClick={() => { setMoreOpen(!moreOpen); moreOpen ? setOptOutside(true) : setOptOutside(false) }} />
                  <div className={`${moreOpen ? "animate-openD" : optOutside ? "animate-closeD" : "hidden"} absolute top-6 right-0 flex-col text-sm dark:text-white bg-gray-200 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 shadow-2xl rounded overflow-hidden`}>
                    {username === currentUser.username ? (
                      <button className="px-3 py-1.5 hover:bg-gray-500 hover:text-white">Report</button>
                    ) : <>
                      <button className="px-3 py-1.5 hover:bg-gray-500 hover:text-white">Report</button>
                    </>
                    }
                  </div>
                </div>
                <span className="text-3xl font-bold">{data.username}</span>
                <div className="fulname flex flex-col items-center">
                  <span className="font-semibold">{data.fullname}</span>
                  <span className="text-xs text-lime-600 font-bold">{data.type === 'faculty' ? 'Faculty' : 'Student'}</span>
                </div>
                <div className="middle flex flex-col sm:flex-row items-center gap-5 w-full">
                  <div className="info flex flex-col flex-1 items-center">
                    <div className="item text-xs lg:text-sm flex items-center">
                      <PlaceIcon className="scale-75" />
                      <span>{data.city?data.city:"City"}</span>
                    </div>
                    <a rel="noreferrer" href={`https://${data.website}`} target="_blank" >
                      <div className="item text-xs lg:text-sm flex items-center">
                        <WebIcon className="scale-75" />
                        <span>{data.website?data.website:"Website"}</span>
                      </div>
                    </a>
                  </div>
                  <div className="btns flex flex-1 gap-2 items-center justify-center">
                    <div className="followbtn group inline-flex relative bg-btn dark:bg-dbtn rounded overflow-hidden cursor-pointer" onClick={relLoading ? "" : username === currentUser.username ? () => setUpdateOpen(true) : handleFollow}>
                      <span className="p-1.5 z-10 text-white">{relLoading ? (
                        "Loading..."
                      ) : username === currentUser.username ? "Update" : relationData.includes(currentUser.username)
                        ? "Following"
                        : "Follow"}</span>
                      <span className="absolute z-0 top-0 left-0 w-32 h-32 transition-all duration-500 ease-in-out rotate-45 -translate-x-32 -translate-y-20 bg-rose-800 group-hover:translate-x-0 group-hover:rotate-90 group-active:bg-black group-active:opacity-50"></span>
                      {loading && <Loader size={20} lColor={"white"} dColor={"white"} />}
                    </div>
                    <div className="chatbtn group inline-flex relative bg-gray-500 dark:bg-gray-800 rounded overflow-hidden cursor-pointer" onClick={() => setDialogOpen(true)}>
                      <span className="p-1.5 z-10 text-white">Chat</span>
                      <span className="absolute z-0 top-0 left-0 w-32 h-32 transition-all duration-500 ease-in-out rotate-45 -translate-x-32 -translate-y-20 bg-gray-700 dark:bg-gray-600 group-hover:translate-x-0 group-hover:rotate-90 group-active:bg-black group-active:opacity-50"></span>
                    </div>
                    <div className="cursor-pointer"
                      onClick={(e) => {
                        window.location.href = "mailto:" + data.email;
                        e.preventDefault();
                      }}
                    ><EmailIcon /></div>
                  </div>

                  <div className="rBottom flex flex-1 items-center justify-center">
                    <ClassIcon /> {data.class?data.class:"Class"}
                  </div>
                </div>
                {error && error.response.data}
                <div className="social flex justify-evenly pt-3">
                  <a href="http://facebook.com" className="hover:text-blue-600">
                    <FacebookIcon fontSize="large" />
                  </a>
                  <a href="http://instagram.com" className="hover:text-rose-500">
                    <InstagramIcon fontSize="large" />
                  </a>
                  <a href="http://twitter.com" className="hover:text-blue-700">
                    <TwitterIcon fontSize="large" />
                  </a>
                  <a href="http://github.com" className="hover:text-zinc-900 dark:hover:text-zinc-600">
                    <GitHubIcon fontSize="large" />
                  </a>
                </div>
              </div>
              <Posts username={username} />
            </div>
          </>
        )}
      {updateOpen && <Update setUpdateOpen={setUpdateOpen} user={data} />}
      {dialogOpen && <Dialog setDialogOpen={setDialogOpen} dFunction={message} qst="Do you wanna send 'Hi' " value={"to '" + username + "' ?"} />}
    </div>
  );
};

export default Profile;
