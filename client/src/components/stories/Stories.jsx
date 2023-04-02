import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  //dummy
  const stories = [
    { id: 1, name: "Nadhu", img: "dummy/stry1.jpg" },
    { id: 2, name: "Jaffar", img: "dummy/stry2.jpg" },
    { id: 3, name: "Sreehari", img: "dummy/stry3.jpg" },
    { id: 4, name: "Razin", img: "dummy/stry4.jpg" },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
