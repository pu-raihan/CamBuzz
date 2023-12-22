import { useContext, useState } from "react";
import "./forum.scss"
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from "@mui/icons-material/SendOutlined";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

const Forum = ({ setForumOpen }) => {

    const { currentUser } = useContext(AuthContext);
    const [newMessage, setNewMessage] = useState("");

    const { isLoading, error, data } = useQuery(["chats"], () =>
        makeRequest.get("/chats/forum?username=" + currentUser.username).then((res) => {
            return res.data;
        })
    );

    const formattedDate = (timestamp) => {
        return moment(timestamp).calendar(null, {
            sameDay: '[Today] LT',
            lastDay: '[Yesterday] LT',
            lastWeek: 'dddd LT',
            sameElse: 'MMM D YYYY',
        });
    }

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newMessage) => {
            return makeRequest.post("/chats", newMessage);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["chats"]);
            },
        }
    );
    const sendMessage = async (e) => {
        e.preventDefault();
        if (currentUser.type !== "guest") {
            const messageData = {
                sender: currentUser.username,
                message: newMessage,
                forum: true,
            };
            mutation.mutate(messageData);
            setNewMessage("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(event);
        }
    }

    return (
        <div className="chatbox sticky top-[112px] h-[calc(100vh-192px)] sm:h-[calc(100vh-112px)] sm:rounded-xl bg-bg1 dark:bg-dbg1 dark:text-white overflow-scroll no-scrollbar">
            <div className="forumtop flex items-center py-4 px-6 bg-bg4 dark:bg-dbg4 text-white h-20 border-bg1 dark:border-dbg1 border-b-8 text-lg">
                <div className="back inline-flex items-center justify-center group relative" onClick={() => setForumOpen(false)}>
                    <BackIcon />
                    <span className="ml-1 absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-11 group-hover:h-11 opacity-10" />
                </div>
                <span className="mx-auto">P U Forum</span>
            </div>
            <div className="messages relative flex flex-col-reverse p-7 gap-2 h-[calc(100vh-336px)] sm:h-[calc(100vh-296px)] overflow-scroll no-scrollbar">
                {isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                    : data.map((message) => (
                        <div
                            key={message.time}
                            className={`flex flex-col max-w-[70%] text-sm gap-0.5 ${message.sender === currentUser.username ? "me self-end [&>*]:self-end text-white last:[&>*]:text-black dark:last:[&>*]:text-white" : "other font-medium [&>*]:self-start text-black dark:last:[&>*]:text-white"}`}
                        >
                            {message.sender !== currentUser.username &&
                                <div className="othusr flex items-center justify-center mb-0.5 gap-2 cursor-pointer" onClick={() => { navigate("/profile/" + message.sender); window.location.reload() }}>
                                    <img className="w-4 h-4 object-cover rounded-full" src={"/profile/" + message.profilePic} alt="" />
                                    <div className="message-user dark:text-white font-semibold text-xs">{message.sender}</div>
                                </div>
                            }
                            <div className={`message-content p-2.5 rounded-md shadow-ful1 ${message.sender === currentUser.username ? "bg-bg4 dark:bg-dbg4" : "bg-white dark:bg-white"}`}>{message.message}</div>
                            <div className="text-xxs">{formattedDate(message.time)}</div>
                        </div>
                    ))}
                {error && error.response.data}
            </div>
            <div className="send flex items-center justify-between h-16 pt-2.5 pb-3 px-4 gap-4 text-black bg-dbg4 dark:bg-transparent">
                <input
                    autoFocus
                    className="w-full h-full rounded-full px-4 focus:ring-0"
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <div className="sendbtn inline-flex items-center justify-center group relative cursor-pointer" onClick={sendMessage} >
                    <SendIcon className="ml-2 z-20 transition ease-in group-active:-rotate-12 duration-200 dark:text-white" />
                    <span className="absolute z-10 w-0 h-0 transition-all duration-300 ease-out bg-pink-950   dark:bg-rose-500 rounded-full group-hover:w-11 group-hover:h-11 opacity-30 dark:opacity-10"></span>
                    <span className="absolute z-0 w-11 h-11 bg-white dark:bg-dbg4 rounded-full opacity-100"></span>
                </div>
            </div>
        </div>

    )
}

export default Forum