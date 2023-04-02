import "./profile.scss";
import FacebookIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import MoreIcon from "@mui/icons-material/MoreVertRounded";
import Posts from "../../components/posts/Posts";

const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.indianexpress.com/2023/01/shah-rukh-khan-3.jpg"
          alt=""
          className="cover"
        />
        <img src="../prof.jpg" alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <div className="l1">
              <a href="http://facebook.com">
                <FacebookIcon fontSize="large" />
              </a>
              <a href="http://instagram.com">
                <InstagramIcon fontSize="large" />
              </a>
            </div>
            <div className="l1">
              <a href="http://twitter.com">
                <TwitterIcon fontSize="large" />
              </a>
              <a href="http://github.com">
                <GitHubIcon fontSize="large" />
              </a>
            </div>
          </div>
          <div className="center">
            <span>Raihan</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>Kerala</span>
              </div>
              <div className="item">
                <WebIcon />
                <span>Website</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailIcon />
            <MoreIcon />
          </div>
        </div>
      <Posts/>
      </div>
    </div>
  );
};

export default Profile;
