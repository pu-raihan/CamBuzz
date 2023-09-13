import { useContext, useState } from "react";
import "./chats.scss"
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Chat from "./Chat";
import Forum from "./Forum";
import Loader from "../loader/Loader";

const Chats = () => {

    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery(["chats", currentUser.username], () =>
        makeRequest.get("/chats/all?username=" + currentUser.username).then((res) => {
            return res.data;
        })
    );

    const [user, setUser] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [ForumOpen, setForumOpen] = useState(false);

    const gotoChat = (username, profilePic) => {
        setUser({ username, profilePic })
        setChatOpen(true)
    }

    return (
        <div className="chats">
            <div className="container">
                {!chatOpen && !ForumOpen && <>
                    <div className="item" >
                        <span>Groups</span>
                        <div className="user" onClick={() => setForumOpen(true)}>
                            <div className="userInfo">
                                <img src="/DarkRound.png" alt="" />
                                {/* <div className="online" /> */}
                                <span>PU Forum</span>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <span>Chats</span>
                        {isLoading ? <Loader size={30} lColor={"black"} dColor={"white"} />
                            : data?data.map((item) => (
                                <div key={item.time} className="user" onClick={() => gotoChat(item.username, item.profilePic)}>
                                    <div className="userInfo">
                                        <img src={"/profile/" + item.profilePic} alt="" />
                                        <span>{item.username}</span>
                                    </div>
                                    <span>{moment(item.time).fromNow()}</span>
                                </div>
                            )):<p className="noData">No chats</p>
                            }
                        {error && error.response.data}
                    </div>
                </>
                }{
                    chatOpen && <Chat user={user} setChatOpen={setChatOpen} />
                }{
                    ForumOpen && <Forum setForumOpen={setForumOpen} />
                }
            </div>
        </div>
    )
}

export default Chats