import "./post.scss";
import MoreIcon from "@mui/icons-material/MoreVertRounded";
import { Link } from "react-router-dom";
import CommentIcon from '@mui/icons-material/ChatOutlined';
import ShareIcon from '@mui/icons-material/SendOutlined';
import LikeIcon from "@mui/icons-material/FavoriteBorderRounded";
import LikedIcon from "@mui/icons-material/FavoriteRounded";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {

const [commentOpen,setCommentOpen] = useState(false)

  const liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span>
              </Link>
              <span className="date">2 min ago</span>
            </div>
          </div>
          <MoreIcon />
        </div>
        <div className="content">
          <img src={post.img} alt="" />
          <p>{post.desc}</p>
        </div>
        <div className="info">
          <div className="item">
            {liked ? <LikedIcon /> : <LikeIcon />}
            16 Likes
          </div>
          <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
            <CommentIcon />5 Comments
          </div>
          <div className="item">
            <ShareIcon/>
            Share
          </div>
        </div>
        {commentOpen && <Comments/>}
      </div>
    </div>
  );
};

export default Post;
