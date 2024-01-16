import { useContext, useState } from "react";
import "./events.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import CloseIcon from "@mui/icons-material/CloseRounded";
import Upload from "./Upload";
import Loader from "../../components/loader/Loader";

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
        <div className="events relative flex flex-col p-4 min-h-[calc(100vh-192px)] sm:min-h-[calc(100vh-112px)] bg-bgSoft dark:bg-dbgSoft gap-1.5 overflow-scroll no-scrollbar">
            {error
                ? "Something went wrong!"
                : isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                    : data.length ? data.map((event) =>
                        <div className="event flex items-center shadow-lg rounded-xl bg-bg1 dark:bg-dbg1 w-full h-[20vh]" key={event.id} >
                            <img className="w-1/2 sm:w-[200px] object-cover p-4 h-full cursor-pointer" src={"/events/" + event.img} onClick={() => handleImage(event.img)} alt="" />
                            <div className="deets w-1/2 sm:w-auto h-full py-4 pr-4 flex flex-col justify-between text-gray-700 dark:text-gray-300">
                                <p className="text-xl font-extrabold text-gray-900 dark:text-gray-100">{event.desc}</p>
                                <span className="text-xs">Date : {moment(event.date).calendar(null, {
                                    sameDay: '[Today] LT',
                                    lastDay: '[Yesterday] LT',
                                    lastWeek: 'dddd LT',
                                    sameElse: 'MMM D YYYY',
                                })}</span>
                                <span className="text-xs">Venue : {event.venue}</span>
                                <div className="text-xxs lg:text-xs text-green-600 dark:text-green-400 font-semibold">Posted by <a href={`/profile/${event.username}`}>{event.username}</a></div>
                            </div>
                        </div>) : <div className="noData m-auto font-semibold dark:text-white">No Events</div>}
            {currentUser.type === 'faculty' && <div className="newEvent cursor-pointer shadow-lg rounded-xl p-5 bg-bg1 dark:bg-dbg1 bg-opacity-70 dark:bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 dark:hover:bg-opacity-100 dark:text-gray-200" onClick={() => setUploadOpen(true)}>
                <span>+ Add new event</span>
            </div>}
            {imageOpen && <div className="imagebox fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-999 bg-black bg-opacity-80">
                <img className="object-cover w-5/6 max-h-[80%]" src={"/events/" + image} alt="" />
                <button className="close absolute top-2.5 right-5 text-white" onClick={() => setImageOpen(false)}>
                    <CloseIcon />
                </button></div>}
            {uploadOpen && <Upload setUploadOpen={setUploadOpen} currentUser={currentUser} />}
        </div>
    );
};

export default Events;
