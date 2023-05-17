import { useContext, useState } from "react";
import "./events.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import CloseIcon from "@mui/icons-material/CloseRounded";
import Upload from "./Upload";

const Events = () => {
    const { currentUser } = useContext(AuthContext);
    const [imageOpen, setImageOpen] = useState(false)
    const [image, setImage] = useState(false)
    const [uploadOpen, setUploadOpen] = useState(false);


    const { isLoading, error, data } = useQuery(["events"], () =>
        makeRequest.get("/events").then((res) => {
            return res.data;
        })
    );
    const handleImage = (image) => {
        setImage(image)
        setImageOpen(true)
    }

    return (
        <div className="events">
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "loading events"
                    : data.length ? data.map((event) =>
                        <div className="event" key={event.id} >
                            <img src={"/events/" + event.img} onClick={() => handleImage(event.img)} />
                            <div className="eventDetails">
                                <p>{event.desc}</p>
                                <span>Date : {moment(event.date).calendar(null, {
                                    sameDay: '[Today] LT',
                                    lastDay: '[Yesterday] LT',
                                    lastWeek: 'dddd LT',
                                    sameElse: 'MMM D YYYY',
                                })}</span>
                                <span className="venue">Venue : {event.venue}</span>
                                <div>Posted by Dr {event.username}</div>
                            </div>
                        </div>) : <div className="noData">No Events</div>}
            {currentUser.type === 'faculty' && <div className="newEvent" onClick={() => setUploadOpen(true)}>
                <span>+ Add new event</span>
            </div>}
            {imageOpen && <div className="imagebox">
                <img src={"/events/" + image} />
                <button className="close" onClick={() => setImageOpen(false)}>
                    <CloseIcon />
                </button></div>}
            {uploadOpen && <Upload setUploadOpen={setUploadOpen} currentUser={currentUser} />}
        </div>
    );
};

export default Events;