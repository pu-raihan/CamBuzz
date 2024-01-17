import { useContext } from "react";

import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/loader/Loader";

const Requests = () => {
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest.get("/requests?class=" + currentUser.class + "&type=" + currentUser.type).then((res) => {
            return res.data;
        })
    );
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (postData) => {
            return makeRequest.post("/requests", postData);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleClick = (approved, postid) => {
        mutation.mutate({ approved, postid });
    }

    return (
        <div className="requests relative flex flex-col p-4 min-h-[calc(100vh-192px)] sm:min-h-[calc(100vh-112px)] bg-bgSoft dark:bg-dbgSoft gap-1.5 overflow-scroll no-scrollbar">
            {error
                ? "Something went wrong!"
                : isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                    : data.length ?
                        data.map((request) =>
                            <div className="request shadow-lg bg-bg1 dark:bg-dbg1 rounded-2xl" key={request.postid}>
                                <div className="p-5" >
                                    <div className="user relative flex items-center justify-between dark:text-white">
                                        <div className="userInfo flex gap-5">
                                            <img className="w-10 h-10 object-cover rounded-full" src={"/profile/" + request.profilePic} alt="" />
                                            <div className="detail flex flex-col">
                                                <Link
                                                    to={`/profile/${request.username}`}
                                                    
                                                >
                                                    <span className="name font-medium">{request.username}</span>
                                                </Link>
                                                <span className="date text-gray-700 dark:text-gray-300 text-xs">{moment(request.createdAt).fromNow()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content mt-2.5">
                                        <img className="w-full max-h-96 object-cover rounded" src={"/posts/" + request.img} alt="" />
                                        <p className="text-base dark:text-white font-semibold p-2.5">{request.desc}</p>
                                    </div>
                                    <div className="action flex items-center justify-evenly rounded-b-md overflow-hidden">
                                        <button className="w-1/2 h-10 bg-red-600 text-white" onClick={() => handleClick(false, request.postid)}>Decline</button>
                                        <button className="w-1/2 h-10 bg-green-600 text-white" onClick={() => handleClick(true, request.postid)}>Approve</button>
                                    </div>
                                </div>
                            </div>

                        ) :
                        <p className="noData m-auto dark:text-white font-semibold">No Pending requests</p>
            }

        </div>
    );
}

export default Requests;