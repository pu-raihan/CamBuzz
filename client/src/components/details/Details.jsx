import MapIcon from '@mui/icons-material/MapOutlined';
import MapFilledIcon from '@mui/icons-material/Map';
import CloseIcon from "@mui/icons-material/CloseRounded";
import "./details.scss"
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Map from "../maps/Map";
import Loader from "../loader/Loader";

const Details = () => {

    const API_KEY = process.env.REACT_APP_GOOGLE_API;
    const [itemRes, setRes] = useState({
        address: 'Pondicherry University, Puducherry.',
        lat: 12.022905608968097,
        lng: 79.85419317950598,
    });

    const [mapOpt, setMap] = useState({
        all: true, zoomLevel: 15,
    });
    const [mapOpen, setMapopen] = useState(false);
    const [err, setErr] = useState(null);


    const resource = useLocation().pathname.split("/")[2];

    const { isLoading, error, data } = useQuery(["resources"], () =>
        makeRequest.get("/resources/" + resource).then((res) => {
            return res.data;
        })
    );
    const { isLoading: headLoading, error: headError, data: headData } = useQuery(["reshead"], () =>
        makeRequest.get("/reshead/" + resource).then((res) => {
            return res.data;
        })
    );
    const [sortedData, setSortedData] = useState(data);

    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                if (error.code === 1) {
                    if ("Notification" in window && Notification.permission !== "granted") {
                        Notification.requestPermission().then((permission) => {
                            if (permission === "granted") {
                                console.log("User has granted permission for location access")
                            } else if (permission === "denied") {
                                console.log("User has denied permission for location access")
                            }
                        });
                    }
                    setErr(error.message + "...Please allow location access")
                }
                console.error(error);
            }
        );
    }, []);

    useEffect(() => {
        setSortedData([])
        if (!isLoading && currentLocation && data) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
            script.onload = () => {
                const dataWithDistance = data.map((item) => {
                    const directionsService = new window.google.maps.DirectionsService();
                    const origin = new window.google.maps.LatLng(
                        currentLocation.lat,
                        currentLocation.lng
                        // 12.015620324613108, 79.85482424187616
                    );
                    const destination = new window.google.maps.LatLng(
                        item.coordinates.x,
                        item.coordinates.y
                    );
                    const request = {
                        origin: origin,
                        destination: destination,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    };
                    directionsService.route(request, (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            item.distance = result.routes[0].legs[0].distance.value;
                            console.log(item.distance);
                            item.directions = result
                            setSortedData((prevSortedData) =>
                                [...prevSortedData, item].sort((a, b) => a.distance - b.distance)
                            );
                        } else {
                            console.error(`Error fetching directions ${result}`);
                        }
                    });
                    return item;
                });
                console.log(dataWithDistance);
            };
            document.head.appendChild(script);
        }
    }, [isLoading, currentLocation, data, API_KEY]);

    const handleClick = (resitem, all) => {
        if (!all) {
            setRes([resitem])
            setMap({ all: all, zoomLevel: 16 })
        } else {
            setRes(resitem)
            setMap({ all: all, zoomLevel: 15 })
        }
        setMapopen(true)
    };
    return (
        <div className="details">
            {headError
                ? "Titles couldn't load!"
                : headLoading ? <Loader noBg={true} size={35} lColor={"black"} dColor={"white"} />
                    : <>
                        <h1>{headData[0].heading}</h1>
                        <div className="allbtn" onClick={() => handleClick(sortedData, true)}>
                            <span>View All</span><MapFilledIcon />
                        </div>
                    </>}
            {error
                ? "Something went wrong!"
                : isLoading ? <Loader noBg={true} size={35} lColor={"black"} dColor={"white"} />
                    : sortedData ? sortedData.map((resitem) => (
                        <div className="resourceItem" resitem={resitem} key={resitem.id}>
                            <div className="itemTop">
                                <p className='name'>{resitem.name}</p>
                                <p className='remarks'>{resitem.remarks}</p>
                            </div>
                            <div className="itemBottom">
                                <p className='distance'>{resitem.distance / 1000}<span style={{ fontSize: "10px", fontWeight: "400" }} > KMs away</span></p>
                                {resitem.avail === 0 ? <span style={{ color: "red" }}> Not Available</span> : <span style={{ color: "green" }}> Available</span>}
                                <MapIcon onClick={() => handleClick(resitem, false)} />
                            </div>
                        </div>
                    )) : <span style={{ margin: "auto" }}>No resources in database</span>
            }{err && err}
            {mapOpen &&
                <div className="map" >
                    <div className="close">
                        <CloseIcon onClick={() => setMapopen(false)} />
                    </div>
                    <Map
                        currentLocation={currentLocation}
                        location={itemRes}
                        zoomLevel={mapOpt.zoomLevel}
                        icon={resource}
                    />
                </div>}
        </div>
    );
};
export default Details;
