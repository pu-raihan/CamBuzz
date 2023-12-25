import { useContext, useState } from "react";
import "./chat.scss"
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from "@mui/icons-material/SendOutlined";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const Chat = ({ user, setChatOpen }) => {

    const { currentUser } = useContext(AuthContext);
    const [newMessage, setNewMessage] = useState("");

    const { isLoading, error, data } = useQuery(["chats"], () =>
        makeRequest.get("/chats/single?user1=" + currentUser.username + "&user2=" + user.username).then((res) => {
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
                receiver: user.username,
                message: newMessage,
                forum: false
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
            <div className="top flex items-center justify-between py-4 px-6 bg-bg4 dark:bg-dbg4 text-white h-20 border-bg1 dark:border-dbg1 border-b-8 text-lg">
                <div className="back cursor-pointer inline-flex items-center justify-center group relative" onClick={() => setChatOpen(false)}>
                    <BackIcon />
                    <span className="ml-1 absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-11 group-hover:h-11 opacity-10"></span>
                </div>
                <span>{user.username}</span>
                <div className="flex items-center w-11 h-11 bg-white rounded-full cursor-pointer" onClick={() => { navigate("/profile/" + user.username); window.location.reload() }}>
                    <img className="object-cover rounded-full m-auto w-10 h-10" src={"/profile/" + user.profilePic} alt="" />
                </div>
            </div>
            <div className="messages relative flex flex-col-reverse p-7 h-[calc(100vh-336px)] sm:h-[calc(100vh-296px)] overflow-scroll no-scrollbar">
                {isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                    : data.map((message) => (
                        <div
                            key={message.time}
                            className={`flex flex-col max-w-[70%] mb-1 text-sm ${message.sender === currentUser.username ? "me self-end [&>*]:self-end first:[&>*]:bg-bg4 dark:first:[&>*]:bg-dbg4 text-white last:[&>*]:text-black dark:last:[&>*]:text-white" : "other font-medium [&>*]:self-start first:[&>*]:bg-white text-black dark:last:[&>*]:text-white"}`}
                        >
                            <div className="message-content p-2.5 rounded-md shadow-ful1">{message.message}</div>
                            <div className="text-xxs mt-1">{formattedDate(message.time)}</div>
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
                <div className={`sendbtn inline-flex items-center justify-center relative ${newMessage===""?'opacity-60':'group cursor-pointer'}`} onClick={newMessage!==""?sendMessage:null} >
                    <SendIcon className="ml-2 z-20 transition ease-in group-active:-rotate-12 duration-200 dark:text-white" />
                    <span className="absolute z-10 w-0 h-0 transition-all duration-300 ease-out bg-pink-950 dark:bg-rose-500 rounded-full group-hover:w-11 group-hover:h-11 opacity-30 dark:opacity-10"></span>
                    <span className="absolute w-11 z-0 h-11 bg-white dark:bg-dbg4 rounded-full opacity-100"></span>
                </div>
            </div>
        </div>

    )
}

export default Chat