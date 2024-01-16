import { DotSpinner } from '@uiball/loaders'
// import "./loader.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Loader = ({ size, dColor, lColor, noBg, bgc }) => {

  const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`loaderDiv flex z-998 items-center justify-center w-full h-full absolute rounded-md top-0 right-0 left-0 bottom-0 m-auto ${!noBg&&"bg-bg1 dark:bg-dbg1 bg-opacity-80 dark:bg-opacity-80"}`} style={bgc?{background:`${bgc}`}:{}} >
            <DotSpinner
                size={size}
                speed={0.7}
                color={darkMode?dColor:lColor}
            />
        </div>
    )
}
export default Loader;