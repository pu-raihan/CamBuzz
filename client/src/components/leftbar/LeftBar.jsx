import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./leftBar.scss";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={"/"+currentUser.profilePic} alt="" />
            <span>{currentUser.username}</span>
          </div>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your Shorcuts</span>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
        </div>
        <hr />
        <div className="menu">
            
          <span>Others</span>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src="/loginbg.jpg" alt="" />
            <span>Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftBar;
