import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// 
import { AuthContext } from "../../context/authContext";
import {
    signInWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import PowerIcon from "@mui/icons-material/PowerSettingsNewOutlined";


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

    useEffect(() => {
        if (!currentUser) {
            navigate("/login")
        }
    }, [currentUser, navigate])

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
        <div className="body h-screen bg-loginbg flex items-center justify-center">
            <div className="shadow-lg flex flex-col gap-10 items-center justify-center min-h-[400px] sm:h-3/5 w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 rounded-2xl bg-gradient-to-r from-[#fff1f1] to-[#f7e7e7] overflow-hidden">
                <div className="flex gap-2.5 w-5/6 sm:w-3/4 justify-center">
                    <img className="w-1/5" src="/dark.png" alt="" />
                    <p className="w-4/5 font-semibold text-left text-sm sm:text-lg">Kindly Check your registered email for verification link
                        <br />{currentUser?.email}</p>
                </div>
                <div className="flex flex-col gap-5 text-zinc-600 items-center">
                    <span>Didn't get your verification link?</span>
                    <input
                        className="rounded-md border-none p-2 w-4/5"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                    <button className="w-1/2 p-2.5 border-none bg-btn hover:bg-dbtn text-white text-sm font-bold rounded-md m-auto" onClick={handleClick}>Resend</button>
                    {body}
                    <button className="text-red-700 font-semibold text-sm" onClick={handleLogout}><PowerIcon /> Logout</button>
                </div>
            </div>
        </div>
    );
};

export default VerifyMail;
