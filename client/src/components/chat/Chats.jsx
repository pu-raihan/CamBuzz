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

    const [user, setUser] = useState(null);
    const [show, setshow] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [ForumOpen, setForumOpen] = useState(false);

    const chaturl = useLocation().pathname.split("/");

    useEffect(() => {
        chaturl[1] === 'chats' ? setshow(!sidebar) : setshow(sidebar)
    }, [chaturl, sidebar]);

    const gotoChat = (username, profilePic) => {
        setUser({ username, profilePic })
        setChatOpen(true)
    }

    return (
        <div className="chats sticky top-[112px] h-[calc(100vh-192px)] sm:h-[calc(100vh-112px)] bg-bgSoft dark:bg-dbgSoft dark:text-white overflow-scroll no-scrollbar">{show &&
            <div className="sm:p-5 flex flex-col h-full">
                {!chatOpen && !ForumOpen && <>
                    <div className="item max-h-[calc(30vh)] shadow-lg p-5 bg-bg1 dark:bg-dbg1 sm:mb-3.5 overflow-scroll no-scrollbar border-b-4 border-bg1 dark:border-dbg1" >
                        <span className="text-xs text-gray-500 dark:text-gray-400">Groups</span>
                        <div className="user flex items-center justify-between my-5" onClick={() => setForumOpen(true)}>
                            <div className="userInfo flex items-center relative gap-2.5">
                                <img className="w-10 h-10 rounded-full object-cover" src="/DarkRound.png" alt="" />
                                {/* <div className="online top-0 left-7 w-3 h-3 bg-green-500 absolute rounded-full" /> */}
                                <span>PU Forum</span>
                            </div>
                        </div>
                    </div>

                    <div className="item flex-1 flex-col relative shadow-lg p-5 bg-bg1 dark:bg-dbg1 overflow-scroll no-scrollbar border-b-4 border-bg1 dark:border-dbg1">
                        <span>Chats</span>
                        {isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                            : data && data.length > 0 ? data.map((item) => (
                                <div key={item.time} className="user flex items-center justify-between my-5" onClick={() => gotoChat(item.username, item.profilePic)}>
                                    <div className="userInfo flex items-center relative gap-2.5">
                                        <img className="w-10 h-10 rounded-full object-cover" src={"/profile/" + item.profilePic} alt="" />
                                        <span>{item.username}</span>
                                        {/* <div className="online top-0 left-7 w-3 h-3 bg-green-500 absolute rounded-full" /> */}
                                    </div>
                                    <span className="text-[9px] lg:text-[10px] text-gray-400 pr-5 md:pr-0 lg:pr-5">{moment(item.time).fromNow()}</span>
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