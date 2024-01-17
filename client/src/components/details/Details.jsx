import MapIcon from '@mui/icons-material/MapOutlined';
import MapFilledIcon from '@mui/icons-material/Map';
import CloseIcon from "@mui/icons-material/CloseRounded";

import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
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
    const [locErr, setLocErr] = useState("Location permissions required");

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
    const mapdiv = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
                setLocErr(null)
            },
            (error) => {
                console.error(error);
                if (error.code === 1) {
                    if ("Notification" in window && Notification.permission !== "granted") {
                        Notification.requestPermission().then((permission) => {
                            if (permission === "granted") {
                                setLocErr(null)
                                console.log("User has granted permission for location access")
                            } else if (permission === "denied") {
                                setLocErr("User has denied permission for location access")
                                console.log(locErr + "...User has denied permission for location access")
                            }
                        });
                    }
                    else
                        setLocErr(error.message)
                }
                else if (error.code === 2) {
                    setLocErr("Couldn't get coordinates")
                }
                else {
                    setLocErr(error.message)
                }
            }
        );
        const handleClickOutside = (event) => {
            if (mapdiv.current && !mapdiv.current.contains(event.target)) {
                setMapopen(false);
                // setOptOutside(true);
            }
            // if (cmtbarRef.current && !cmtbarRef.current.contains(event.target) && !cmtbtnRef.current.contains(event.target)) {
            //     setCommentOpen(false);
            //     setCmtOutside(true);
            // }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [locErr, mapdiv]);

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
        <div className={`details h-[calc(100vh-192px)] sm:h-[calc(100vh-112px)] flex flex-col items-center justify-start gap-1.5 p-4 bg-bgSoft dark:bg-dbgSoft overflow-scroll no-scrollbar ${isLoading && "relative"}`} >
            {locErr ?
                <div className="flex flex-col w-4/5 items-center m-auto gap-5" >
                    <span className='text-red-600 text-xs'>{locErr}</span>
                    <p className='text-black dark:text-white'>Please allow your location access</p>
                </div> : <>
                    {headError
                        ? "Titles couldn't load!"
                        : headLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                            : <div className='flex w-full items-center justify-evenly'>
                                <h1 className='flex-2 pr-2 text-right text-gray-600 font-bold dark:text-gray-300'>{headData[0].heading}</h1>
                                <div className="flex flex-1 items-center justify-end gap-1 font-semibold text-xs dark:text-zinc-300 cursor-pointer" onClick={() => handleClick(sortedData, true)} >
                                    <span>View All</span><MapFilledIcon className='scale-75' />
                                </div>
                            </div>}
                    {error
                        ? "Something went wrong!"
                        : isLoading ? <Loader noBg={true} size={30} lColor={"black"} dColor={"white"} />
                            : sortedData ? sortedData.map((resitem) => (
                                <div className="resourceItem flex flex-col items-center w-full p-5 bg-bgGrey dark:bg-dbgGrey text-gray-700 dark:text-gray-300 rounded-md" resitem={resitem} key={resitem.id}>
                                    <div className="itemTop flex gap-2.5 p-2.5 justify-between w-full">
                                        <p className='name font-semibold text-sm xs:text-base dark:text-white w-1/2'>{resitem.name}</p>
                                        <p className='distance flex items-center font-medium text-xxs xs:text-xs w-1/4'>{(resitem.distance / 1000).toFixed(1)} <span className='text-xxs font-normal'>&nbsp; KMs away</span></p>
                                        <span className={`text-xs flex items-center font-medium ${resitem.avail === 0 ? "text-red-600" : "text-lime-600"}`} >{resitem.avail === 0 ? "Unavailable" : "Available"}</span>
                                        <MapIcon className='flex items-center scale-75 cursor-pointer' onClick={() => handleClick(resitem, false)} />
                                    </div>
                                    <div className="itemBottom flex justify-start px-2.5 w-full">
                                        <p className='remarks text-gray-600 dark:text-gray-400 text-xs'>{resitem.remarks}</p>
                                    </div>
                                </div>
                            )) : <span className='m-auto'>No resources in database</span>
                    }
                    {mapOpen &&
                        <div className={`map absolute w-screen h-screen top-0 right-0 z-999 flex items-center justify-evenly flex-col overflow-hidden bg-black bg-opacity-70`} >
                            <div className="close flex justify-end w-screen text-gray-200 pr-[5vw] sm:pr-[10vw]">
                                <CloseIcon onClick={() => setMapopen(false)} />
                            </div>
                            <div ref={mapdiv} className="mapdiv">
                                <Map
                                    currentLoc={currentLocation}
                                    location={itemRes}
                                    zoomLevel={mapOpt.zoomLevel}
                                    icon={resource}
                                />
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    );
};
export default Details;