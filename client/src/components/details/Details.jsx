import MapIcon from '@mui/icons-material/MapOutlined';
import MapFilledIcon from '@mui/icons-material/Map';
import CloseIcon from "@mui/icons-material/CloseRounded";
import "./details.scss"
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Map from "../maps/Map";

const Details = () => {

    const [itemRes, setRes] = useState({
        address: 'Pondicherry University, Puducherry.',
        lat: 12.022905608968097,
        lng: 79.85419317950598,
    });

    const [mapOpt, setMap] = useState({
        all: true, zoomLevel: 15,
    });
    const [mapOpen, setMapopen] = useState(false);
    const [sortedData, setSortedData] = useState([]);
    const [err, setErr] = useState(null);


    const resource = useLocation().pathname.split("/")[2];

    const { isLoading, error, data } = useQuery(["resources"], () =>
        makeRequest.get("/resources/" + resource).then((res) => {
            return res.data;
        })
    );

    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                if ("Notification" in window && Notification.permission !== "granted") {
                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            console.log("User has granted permission for location access")
                        } else if (permission === "denied") {
                            console.log("User has denied permission for location access")
                        }
                    });
                }
                setErr(error.message+"...Please allow location access")
                console.error(error);
            }
        );
    }, []);


    useEffect(() => {
        setSortedData([])
        if (!isLoading && currentLocation && data) {
            const dataWithDistance = data.map((item) => {
                const directionsService = new window.google.maps.DirectionsService();
                const origin = new window.google.maps.LatLng(
                    currentLocation.lat,
                    currentLocation.lng
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
        }
    }, [isLoading, currentLocation, data]);

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
            <h1>{resource}</h1><MapFilledIcon onClick={() => handleClick(data, true)} />
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "loading..."
                    : sortedData ? sortedData.map((resitem) => (
                        <div className="resItem" resitem={resitem} key={resitem.id}>
                            <p>{resitem.id}</p>
                            <p>{resitem.name}</p>
                            {resitem.avail === 0 ? <span style={{ color: "red" }}> Not Available</span> : <span style={{ color: "green" }}> Available</span>}
                            <button onClick={() => handleClick(resitem, false)} >Goto Maps<MapIcon /></button>

                        </div>
                    )) : <span style={{ margin: "auto" }}>No resources in database</span>
            }{err&&err}
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