import GoogleMapReact from 'google-map-react'
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    DirectionsRenderer,
} from "react-google-maps";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PrinterIcon from '@mui/icons-material/Print';
import FoodIcon from '@mui/icons-material/LocalDining';
import ToiletIcon from '@mui/icons-material/Wc';
import HealthIcon from '@mui/icons-material/HealthAndSafety';
import AtmIcon from '@mui/icons-material/LocalAtm';
import SchoolIcon from '@mui/icons-material/School';
import HostelIcon from '@mui/icons-material/Apartment';
import BusIcon from '@mui/icons-material/DirectionsBus';
import LabIcon from '@mui/icons-material/Science';
import LibraryIcon from '@mui/icons-material/AutoStories';
import GymIcon from '@mui/icons-material/FitnessCenter';
import DirectionsIcon from '@mui/icons-material/Directions';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';
import { useEffect } from 'react';

const Map = ({ currentLoc, location, zoomLevel, icon }) => {

    const [currentLocation, setCurrentLocation] = useState(currentLoc);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({
                    lat: latitude, lng: longitude 
                });
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
                }
                console.error(error);
            }
        );
    }, []);

    const [center, setCenter] = useState({
        lat: location[0].coordinates?.x,
        lng: location[0].coordinates?.y
    });
    console.log(location[0].directions);
    const handleCenterMap = () => {
        setCenter({
            lat: currentLocation.lat,
            lng: currentLocation.lng
        });
    };
    const [directions, setDirections] = useState();
    const [isdir, setDir] = useState(false);

    const API_KEY = process.env.REACT_APP_GOOGLE_API;
    const LocationPin = ({ text, icon }) => (
        <div className="pin">
            {icon === "you" && <MyLocationIcon className="pin-icon" style={{ color: "blue" }} />}
            {icon === "water" && <WaterDropIcon className="pin-icon" />}
            {icon === "printer" && <PrinterIcon className="pin-icon" />}
            {icon === "food" && <FoodIcon className="pin-icon" />}
            {icon === "toilet" && <ToiletIcon className="pin-icon" />}
            {icon === "health" && <HealthIcon className="pin-icon" />}
            {icon === "atm" && <AtmIcon className="pin-icon" />}
            {icon === "dept" && <SchoolIcon className="pin-icon" />}
            {icon === "hostel" && <HostelIcon className="pin-icon" />}
            {icon === "bus" && <BusIcon className="pin-icon" />}
            {icon === "lab" && <LabIcon className="pin-icon" />}
            {icon === "library" && <LibraryIcon className="pin-icon" />}
            {icon === "gym" && <GymIcon className="pin-icon" />}
            <p className="pin-text">{text}</p>
        </div>
    )
    const handleGetDirections = () => {
        const directionsService = new window.google.maps.DirectionsService();
        const origin = new window.google.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng
        );
        const destination = new window.google.maps.LatLng(
            location[0].coordinates.x,
            location[0].coordinates.y
        );
        const request = {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
        };
        directionsService.route(request, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
                setDir(true)
            } else {
                console.error(`Error fetching directions ${result}`);
            }
        });
    };

    const DirectionMap = withScriptjs(
        withGoogleMap(({ location, currentLocation }) => {

            const handleGetDirections = () => {
                const directionsService = new window.google.maps.DirectionsService();
                const origin = new window.google.maps.LatLng(
                    currentLocation.lat,
                    currentLocation.lng
                );
                const destination = new window.google.maps.LatLng(
                    location.coordinates.x,
                    location.coordinates.y
                );
                const request = {
                    origin: origin,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                };
                directionsService.route(request, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        console.error(`Error fetching directions ${result}`);
                    }
                });
            };

            return (
                <GoogleMap
                    defaultZoom={zoomLevel}
                    defaultCenter={{
                        lat: location.coordinates.x,
                        lng: location.coordinates.y,
                    }}
                >
                    <Marker
                        position={{
                            lat: location.coordinates.x,
                            lng: location.coordinates.y,
                        }}
                    />
                    {directions && <DirectionsRenderer directions={directions} />}
                    <button className='getDirBtn' onClick={handleGetDirections}><RefreshIcon /> Refresh</button>
                </GoogleMap>
            );
        })
    );

    return (
        <div className="gmap" >
            <div className="google-map" >
                {!isdir && <>
                    <GoogleMapReact
                        center={center}
                        defaultZoom={zoomLevel}
                    >
                        {location?.map((loc) => (
                            <LocationPin key={loc.id}
                                lat={loc.coordinates.x}
                                lng={loc.coordinates.y}
                                text={loc.name}
                                icon={icon}
                            />
                        ))}
                        {currentLocation &&
                            <LocationPin
                                lat={currentLocation.lat}
                                lng={currentLocation.lng}
                                text="You"
                                icon="you"
                            />}
                        {directions && <DirectionsRenderer directions={directions} />}
                    </GoogleMapReact>
                    <button className='centerBtn' onClick={handleCenterMap}>
                        <MyLocationIcon style={{ color: "blue" }} />
                    </button>
                    <button className='getDirBtn' onClick={handleGetDirections} >
                        <DirectionsIcon />  Directions
                    </button></>}
                {isdir && <>
                    <DirectionMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        location={location[0]}
                        currentLocation={currentLocation}
                    />
                    <button className='centerBtn' onClick={handleCenterMap}>
                        <MyLocationIcon style={{ color: "blue" }} />
                    </button>

                </>}

            </div>
        </div>
    )
}
export default Map;
