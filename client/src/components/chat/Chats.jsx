import { useContext, useEffect, useState } from "react";
import "./chats.scss"
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Chat from "./Chat";
import Forum from "./Forum";
import Loader from "../loader/Loader";
import { useLocation } from "react-router";

const Chats = ({ sidebar }) => {

    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["chats", currentUser.username], () =>
        makeRequest.get("/chats/all?username=" + currentUser.username).then((res) => {
            return res.data;
        })
    );
        console.log(data);
    const [user, setUser] = useState(null);
    const [show, setshow] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [ForumOpen, setForumOpen] = useState(false);

    const chaturl = useLocation().pathname.split("/") ;

    useEffect(() => {
        chaturl[1]=== 'chats' ? setshow(!sidebar) : setshow(sidebar)
    }, [chaturl, sidebar]);

    const gotoChat = (username, profilePic) => {
        setUser({ username, profilePic })
        setChatOpen(true)
    }

    return (
        <div className="chats sticky top-[112px] h-[calc(100vh-192px)] sm:h-[calc(100vh-112px)] bg-bgSoft dark:bg-dbgSoft dark:text-white overflow-scroll no-scrollbar">{show &&
            <div className="container sm:p-5">
                {!chatOpen && !ForumOpen && <>
                    <div className="item h-[calc(30vh)] shadow-lg p-5 bg-bg1 dark:bg-dbg1 sm:mb-3.5" >
                        <span>Groups</span>
                        <div className="user flex items-center justify-between my-5" onClick={() => setForumOpen(true)}>
                            <div className="userInfo">
                                <img src="/DarkRound.png" alt="" />
                                {/* <div className="online" /> */}
                                <span>PU Forum</span>
                            </div>
                        </div>
                    </div>

                    <div className="item relative h-[calc(70vh-192px)] shadow-lg p-5 bg-bg1 dark:bg-dbg1 overflow-scroll no-scrollbar">
                        <span>Chats</span>
                        {isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                            : data&&data.length>0 ? data.map((item) => (
                                <div key={item.time} className="user flex items-center justify-between my-5" onClick={() => gotoChat(item.username, item.profilePic)}>
                                    <div className="userInfo">
                                        <img src={"/profile/" + item.profilePic} alt="" />
                                        <span>{item.username}</span>
                                    </div>
                                    <span className="text-[11px] text-gray-400">{moment(item.time).fromNow()}</span>
                                </div>
                            )) : <p className="m-auto font-semibold">No chats</p>
                        }
                        {error && error.message}
                    </div>
                </>
                }{
                    chatOpen && <Chat user={user} setChatOpen={setChatOpen} />
                }{
                    ForumOpen && <Forum setForumOpen={setForumOpen} />
                }
            </div>}
        </div>
    )
}

export default Chats