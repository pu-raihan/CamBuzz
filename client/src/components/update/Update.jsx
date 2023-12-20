import { useContext, useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from '@mui/icons-material/CloseRounded';
import { AuthContext } from "../../context/authContext";

const Update = ({ setUpdateOpen, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const [texts, setTexts] = useState({
    fullname: currentUser.fullname,
    email: currentUser.email,
    city: currentUser.city,
    website: currentUser.website,
  });

  const upload = async (file, dir) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/" + dir, formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(texts);
  };

  const queryClient = useQueryClient();
  const { update } = useContext(AuthContext);
  const [err, setErr] = useState(null);

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(["user"]);
        try {
          await update(user.username);
        } catch (err) {
          setErr(err.response.data);
        }
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser.type !== "guest") {
      let coverUrl;
      let profileUrl;
      coverUrl = cover ? await upload(cover, "coverupload") : user.coverPic;
      profileUrl = profile ? await upload(profile, "profupload") : user.profilePic;

      mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl, type: currentUser.type });

      setUpdateOpen(false);
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form className="focus:[&>*]:ring-bgSoft">
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/cover/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/profile/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Full Name</label>
          <input
            type="text"
            value={texts.fullname}
            name="fullname"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />{err && err.response.data}
          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setUpdateOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Update;
