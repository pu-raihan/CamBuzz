import "./post.scss";
import MoreIcon from "@mui/icons-material/MoreVertRounded";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/ChatOutlined";
import ShareIcon from "@mui/icons-material/SendOutlined";
import LikeIcon from "@mui/icons-material/FavoriteBorderRounded";
import LikedIcon from "@mui/icons-material/FavoriteRounded";
import Comments from "../comments/Comments";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Loader from "../loader/Loader";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [optOutside, setOptOutside] = useState(false);
  const [cmtOutside, setCmtOutside] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { isLoading, error, data } = useQuery(["likes", post.postid], () =>
    makeRequest.get("/likes?postid=" + post.postid).then((res) => {
      return res.data;
    })
  );
  const { isLoading: cLoading, error: cError, data: cData } = useQuery(["comments", post.postid], () =>
    makeRequest.get("/comments?postid=" + post.postid).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postid=" + post.postid);
      return makeRequest.post("/likes", { postid: post.postid });
    },
    {
      onSettled: () => {
        setLoading(false);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const delMutation = useMutation(
    (postData) => {
      return makeRequest.delete("/posts?postid=" + postData.postid + "&type=" + postData.type);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = async () => {
    setLoading(true)
    mutation.mutate(data.includes(currentUser.username));
  };

  const handleDelete = () => {
    delMutation.mutate({ postid: post.postid, type: currentUser.type });
  };

  const optbarRef = useRef(null);
  const cmtbarRef = useRef(null);
  const cmtbtnRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optbarRef.current && !optbarRef.current.contains(event.target)) {
        setMoreOpen(false);
        setOptOutside(true);
      }
      if (cmtbarRef.current && !cmtbarRef.current.contains(event.target) && !cmtbtnRef.current.contains(event.target)) {
        setCommentOpen(false);
        setCmtOutside(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [optbarRef, cmtbarRef,cmtbtnRef]);


  return (
    <div className="post shadow-lg bg-bg1 dark:bg-dbg1 rounded-2xl">
      <div className="cont p-5 flex flex-col gap-2" >
        <div className="top relative flex items-center justify-between dark:text-white">
          <div className="userInfo flex gap-5">
            <img className="w-10 h-10 object-cover rounded-full" src={"/profile/" + post.profilePic} alt="" />
            <div className="detail flex flex-col">
              <Link
                to={`/profile/${post.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="font-medium">{post.username}</span>
              </Link>
              <span className="text-zinc-500 text-xs">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div ref={optbarRef} className="">
            <MoreIcon className="cursor-pointer " onClick={() => { setMoreOpen(!moreOpen); moreOpen ? setOptOutside(true) : setOptOutside(false) }} />
            <div className={`${moreOpen ? "animate-openD" : optOutside ? "animate-closeD" : "hidden"} absolute top-[60px] py-1.5 right-0 flex-col text-sm dark:text-white bg-white dark:bg-dbg1 bg-opacity-90 dark:bg-opacity-90 shadow-2xl rounded overflow-hidden`}>
              {post.username === currentUser.username ? (
                <button className="px-3 py-1.5 hover:bg-gray-500 hover:text-white" onClick={handleDelete}>Delete</button>
              ) : <>
                <button className="px-3 py-1.5 hover:bg-gray-500 hover:text-white">Chat</button>
                <button className="px-3 py-1.5 hover:bg-gray-500 hover:text-white">Unfollow</button>
                <button className="px-3 py-1.5 hover:bg-gray-500 hover:text-white">Report</button>
              </>
              }
            </div>
          </div>
        </div>
        <div className="content flex flex-col gap-2 py-3">
          <img className="w-full max-h-96 object-cover rounded-sm" src={"/posts/" + post.img} alt="Unable to load" />
          {post.desc && <p className="pt-3 text-base font-medium dark:text-white">{post.desc}</p>}
        </div>
        <div className="info flex items-center justify-evenly gap-5">
          <div className="item relative flex items-center gap-2.5 cursor-pointer text-xs xs:text-sm dark:text-gray-200">
            <div className="likeico" style={{ position: "relative" }}>
              {isLoading ?
                (<Loader size={35} color={"black"} noBg={true} />)
                : data?.includes(currentUser.username) ? <>
                  <LikedIcon className="max-xs:scale-90" style={{ color: "#6b173e" }} onClick={handleLike} />
                  {loading && <Loader size={10} dColor={"white"} lColor={"white"} noBg={true} />}</>
                  : <>
                    <LikeIcon className="max-xs:scale-90" style={{ color: "#6b173e" }} onClick={handleLike} />
                    {loading && <Loader size={10} lColor={"black"} dColor={"white"} noBg={true} />}</>
              }
            </div>
            {data ? data.length + " Likes" : error}
          </div>
          <div ref={cmtbtnRef} className="item relative flex items-center gap-2.5 cursor-pointer text-xs xs:text-sm dark:text-gray-200" onClick={() => setCommentOpen(!commentOpen)} >
            <CommentIcon className="max-xs:scale-90" />{cLoading ? <Loader size={15} lColor={"white"} dColor={"white"} noBg={false} /> : cData ? cData.length + " Comments" : cError}
          </div>
          <div className="item relative flex items-center gap-2.5 cursor-pointer text-xs xs:text-sm dark:text-gray-200">
            <ShareIcon className="max-xs:scale-90" />
            Share
          </div>
        </div>
        <div ref={cmtbarRef} className={`cmt ${commentOpen ? "animate-openD" : cmtOutside ? "animate-closeD" : "hidden"}`}>
          <Comments postid={post.postid} comments={cData} />
        </div>
      </div>
    </div>
  );
};

export default Post;
