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
        const messageData = {
            sender: currentUser.username,
            receiver: user.username,
            message: newMessage,
            forum: false
        };
        mutation.mutate(messageData);
        setNewMessage("");
    };

    return (
        <div className="chatbox ">
            <div className="top">
                <BackIcon onClick={() => setChatOpen(false)} />
                <span>{user.username}</span>
                <div className="image" onClick={() => { navigate("/profile/" + user.username); window.location.reload() }}>
                    <img src={"/profile/" + user.profilePic} alt="" />
                </div>
            </div>
            <div className="messages">
                {isLoading ? <Loader noBg={true} size={35} lColor={"black"} dColor={"white"} />
                    : data.map((message) => (
                        <div
                            key={message.time}
                            className={`${message.sender === currentUser.username ? "me" : "other"}`}
                        >
                            <div className="message-content">{message.message}</div>
                            <div className="message-time">{formattedDate(message.time)}</div>
                        </div>
                    ))}
                {error && error}
            </div>
            <div className="send">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <SendIcon style={{ color: "#fff" }} onClick={sendMessage} />
            </div>
        </div>

    )
}

export default Chat