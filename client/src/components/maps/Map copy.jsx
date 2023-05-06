import GoogleMapReact from 'google-map-react'
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
import { useState } from 'react';

const Map = ({ currentLocation, location, zoomLevel, icon }) => {
    console.log(location[0]);
    const [center, setCenter] = useState({
        lat: location[0].coordinates.x,
        lng: location[0].coordinates.y
    });

    const handleCenterMap = () => {
        setCenter({
            lat: currentLocation.lat,
            lng: currentLocation.lng
        });
    };
    const LocationPin = ({ text, icon }) => (
        <div className="pin">
            {icon === "you" && <MyLocationIcon className="pin-icon" style={{color:"blue"}}/>}
            {icon === "water" && <WaterDropIcon className="pin-icon" />}
            {icon === "printer" && <PrinterIcon className="pin-icon" />}
            {icon === "food" && <FoodIcon className="pin-icon" />}
            {icon === "toilet" && <ToiletIcon className="pin-icon" />}
            {icon === "health" && <HealthIcon className="pin-icon" />}
            {icon === "atm" && <AtmIcon className="pin-icon" />}
            {icon === "school" && <SchoolIcon className="pin-icon" />}
            {icon === "hostel" && <HostelIcon className="pin-icon" />}
            {icon === "bus" && <BusIcon className="pin-icon" />}
            {icon === "lab" && <LabIcon className="pin-icon" />}
            {icon === "library" && <LibraryIcon className="pin-icon" />}
            {icon === "gym" && <GymIcon className="pin-icon" />}
            <p className="pin-text">{text}</p>
        </div>
    )

    return (
        <div className="gmap" >
            <div className="google-map" >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBXhaJMNIv_YOWDe3gx-VVdHcnUxyAqLLY' }}
                    center={center}
                    defaultZoom={zoomLevel}
                    className="mapComponent"
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
                </GoogleMapReact>
                <button className='button' onClick={handleCenterMap}>
                    <MyLocationIcon style={{color:"blue"}} />
                    </button>
            </div>
        </div>
    )
}
import GoogleMapReact from 'google-map-react'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
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
import { useState } from 'react';

const Ma= ({ currentLocation, location, zoomLevel, icon }) => {

    const [center, setCenter] = useState({
        lat: location[0].coordinates.x,
        lng: location[0].coordinates.y
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

    const LocationPin = ({ text, icon }) => (
        <div className="pin">
            {icon === "you" && <MyLocationIcon className="pin-icon" style={{ color: "blue" }} />}
            {icon === "water" && <WaterDropIcon className="pin-icon" />}
            {icon === "printer" && <PrinterIcon className="pin-icon" />}
            {icon === "food" && <FoodIcon className="pin-icon" />}
            {icon === "toilet" && <ToiletIcon className="pin-icon" />}
            {icon === "health" && <HealthIcon className="pin-icon" />}
            {icon === "atm" && <AtmIcon className="pin-icon" />}
            {icon === "school" && <SchoolIcon className="pin-icon" />}
            {icon === "hostel" && <HostelIcon className="pin-icon" />}
            {icon === "bus" && <BusIcon className="pin-icon" />}
            {icon === "lab" && <LabIcon className="pin-icon" />}
            {icon === "library" && <LibraryIcon className="pin-icon" />}
            {icon === "gym" && <GymIcon className="pin-icon" />}
            <p className="pin-text">{text}</p>
        </div>
    )
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
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
            {directions && <DirectionsRenderer routes={location[0].directions.routes} />}
        </GoogleMap>
    ));

    const handleClick = (item) => {
        const directionsService = new window.google.maps.DirectionsService();
        const origin = new window.google.maps.LatLng(
            currentLocation.lat,
            currentLocation.lng
        )
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
                console.log(result);
                setDirections(result);
                setDir(true)
            } else {
                console.error(`Error fetching directions ${result}`);
            }
        });
    };

    return (
        <div className="gmap" >
            <div className="google-map" >
                {!isdir && <>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyBXhaJMNIv_YOWDe3gx-VVdHcnUxyAqLLY' }}
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
                    <button className='getDirBtn' onClick={() => handleClick(location[0])}>
                        Get Directions
                    </button></>}
                {isdir && <>
                    <GoogleMapExample
                        containerElement={<div style={{ height: `100%`, width: '100%' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    <button className='centerBtn' onClick={handleCenterMap}>
                        <MyLocationIcon style={{ color: "blue" }} />
                    </button>
                    <button className='getDirBtn' onClick={() => handleClick(location[0])}>
                        Get Directions
                    </button>
                </>}
            </div>
        </div>
    )
}
