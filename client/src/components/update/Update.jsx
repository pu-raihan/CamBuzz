import { useContext, useEffect, useRef, useState } from "react";
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

  const divRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setUpdateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setUpdateOpen, divRef]);

  return (
    <div className="update fixed flex top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-999">
      <div ref={divRef} className="wrapper dark:text-white m-auto w-full xs:w-3/4 h-full xs:h-3/4 lg:w-1/2 p-10 pr-1 bg-bg1 dark:bg-dbg1 flex flex-col max-xs:justify-center shadow-2xl relative">
        <h1 className="text-xl pb-5 font-semibold">Update Your Profile</h1>
        <form className="flex flex-col gap-5 overflow-y-scroll pr-5 [&>input]:bg-transparent focus:[&>*]:ring-0 focus:[&>input]:border-rose-900 [&>label]:text-sm [&>label]:text-gray-700 [&>label]:dark:text-gray-300">
          <div className="files flex flex-wrap gap-12">
            <label className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300" htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer relative">
                <img
                  className="w-24 h-24 object-cover"
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/cover/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="absolute top-0 right-0 bottom-0 left-0 m-auto text-3xl text-gray-200 shadow-lg cursor-pointer" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300" htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer relative">
                <img
                  className="w-24 h-24 object-cover"
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/profile/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="absolute top-0 right-0 bottom-0 left-0 m-auto text-3xl text-gray-200 shadow-lg cursor-pointer" />
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
            className="p-1 border-0 border-b"
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Full Name</label>
          <input
            className="p-1 border-0 border-b"
            type="text"
            value={texts.fullname}
            name="fullname"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            className="p-1 border-0 border-b"
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            className="p-1 border-0 border-b"
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />{err && err.response.data}
          <button className="bg-dbtn hover:bg-dbg4 p-2.5 text-white" onClick={handleSubmit}>Update</button>
        </form>
        <button className="close absolute top-5 right-5 dark:text-white transition ease-in hover:rotate-90 duration-100" onClick={() => setUpdateOpen(false)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default Update;
