import { useContext } from "react";
import "./requests.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import moment from "moment";

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

    const handleClick =  ( approved, postid) => {
        mutation.mutate({ approved, postid });
    }

    return (
        <div className="requests">
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "loading requests"
                    : data.length ?
                        data.map((request) =>
                            <div className="request" key={request.postid}>
                                <div className="container" >
                                    <div className="user">
                                        <div className="userInfo">
                                            <img src={"/profile/" + request.profilePic} alt="" />
                                            <div className="detail">
                                                <Link
                                                    to={`/profile/${request.username}`}
                                                    style={{ textDecoration: "none", color: "inherit" }}
                                                >
                                                    <span className="name">{request.username}</span>
                                                </Link>
                                                <span className="date">{moment(request.createdAt).fromNow()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <img src={"/posts/" + request.img} alt="" />
                                        <p>{request.desc}</p>
                                    </div>
                                    <div className="action">
                                        <button onClick={() => handleClick(false, request.postid)}>Decline</button>
                                        <button onClick={() => handleClick(true, request.postid)}>Approve</button>
                                    </div>
                                </div>
                            </div>

                        ) :
                        <p className="noData">No Pending requests</p>
            }

        </div>
    );
}

export default Requests;