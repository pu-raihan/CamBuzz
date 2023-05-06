import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./verifymail.scss";
import { AuthContext } from "../../context/authContext";
import {
    signInWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";


const VerifyMail = () => {
    const { currentUser } = useContext(AuthContext);
    const [pwd, setPwd] = useState(" ")
    const [body, setBody] = useState(" ")

    const handleClick = () => {
        console.log(pwd);
        signInWithEmailAndPassword(auth, currentUser.email, pwd)
            .then((user) => {
                sendEmailVerification(user.user)
                    .then(() => {
                        setBody("Email sent")
                    })
                    .catch((error) => {
                        setBody(error.message)
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });

    }
    const handleChange = (e) => {
        setPwd(e.target.value)
        setBody(" ")
    }
    
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setBody(err.response.data);
    }
    navigate("/login");
  };
    return (
        <div className="body">
          <img src="/dark.png" alt="" />
            <p>Kindly Check your registered email for verification link
            <br/>{currentUser.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <div className="sendmail">
                <span>Didn't get your verification link?</span>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleClick}>Resend</button>
            </div>
            {body}
        </div>
    );
};

export default VerifyMail;
