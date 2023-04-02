import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);

  //dummy
  const comments = [
    {
      id: 1,
      name: "Nadhu",
      userId: 1,
      img: "/dummy/p1.jpg",
      profilePic: "/dummy/p4.jpg",
      desc: "Awesome",
    },
    {
      id: 2,
      name: "Jaffar",
      userId: 2,
      img: "/dummy/p2.jpg",
      profilePic: "/dummy/p3.jpg",
      desc: "way more to go",
    },
    {
      id: 3,
      name: "Sreehari",
      userId: 3,
      img: "/dummy/p3.jpg",
      profilePic: "/dummy/p2.jpg",
      desc: "great post",
    },
    {
      id: 4,
      name: "Razin",
      userId: 4,
      img: "/dummy/p4.jpg",
      profilePic: "/dummy/p1.jpg",
      desc: "Love you broo",
    },
  ];

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="Add a comment" />
        <button>Share</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
