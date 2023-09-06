import { DotSpinner } from '@uiball/loaders'
import "./loader.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Loader = ({ size, dColor, lColor, noBg }) => {

  const { darkMode } = useContext(DarkModeContext);

    return (
        <div className='loaderDiv' style={!noBg ? { background: "#2a02169a" }:{}} >
            <DotSpinner
                size={size}
                speed={0.7}
                color={darkMode?dColor:lColor}
            />
        </div>
    )
}
export default Loader;