import { useContext, useState } from "react";
import "./forum.scss"
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from "@mui/icons-material/SendOutlined";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Loader from "../loader/Loader";

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
            message: newMessage,
            forum: true,
        };
        mutation.mutate(messageData);
        setNewMessage("");
    };

    return (
        <div className="chatbox ">
            <div className="forumtop">
                <BackIcon onClick={() => setForumOpen(false)} />
                <span>P U Forum</span>
            </div>
            <div className="messages">
                {isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                    : data.map((message) => (
                        <div
                            key={message.time}
                            className={`${message.sender === currentUser.username ? "me" : "other"}`}
                        >
                            {message.sender !== currentUser.username && <div className="message-user">{message.sender}</div>}
                            <div className="message-content">{message.message}</div>
                            <div className="message-time">{formattedDate(message.time)}</div>
                        </div>
                    ))}
                {error && error.response.data}
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

export default Forum