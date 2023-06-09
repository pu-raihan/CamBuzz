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
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

  const [updateOpen, setUpdateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const username = useLocation().pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

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
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationData.includes(currentUser.username));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="images">
            <img src={"/cover/" + data.coverPic} alt="" className="cover" />
            <img
              src={"/profile/" + data.profilePic}
              alt=""
              className="profilePic"
            />
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
                <span>{data.username}</span>{data.type === 'faculty' && <span style={{ fontSize: "12px", color: "#0f0" }}>Faculty</span>}
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <WebIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {relLoading ? (
                  "Loading..."
                ) : username === currentUser.username ? (
                  <button onClick={() => setUpdateOpen(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationData.includes(currentUser.username)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="rightPart">
                <div className="rTop">
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to='#'
                    onClick={(e) => {
                      window.location.href = "mailto:" + data.email;
                      e.preventDefault();
                    }}
                  ><EmailIcon /></Link>
                  <MoreIcon onClick={() => setMoreOpen(!moreOpen)} />
                  {moreOpen &&
                    <button>Chat</button>
                  }</div>
                <div className="rBottom">
                  <ClassIcon /> {data.class}
                </div>
              </div>{error && error}
            </div>
            <Posts username={username} />
          </div>
        </>
      )}
      {updateOpen && <Update setUpdateOpen={setUpdateOpen} user={data} />}
    </div>
  );
};

export default Profile;
