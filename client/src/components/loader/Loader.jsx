import { DotSpinner } from '@uiball/loaders'
import "./loader.scss";

const Loader = ({ size, color, noBg }) => {
    return (
        <div className='loaderDiv' style={!noBg ? { background: "#2a02169a" }:{}} >
            <DotSpinner
                size={size}
                speed={0.7}
                color={color}
            />
        </div>
    )
}
export default Loader;