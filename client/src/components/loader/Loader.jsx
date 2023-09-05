import { DotSpinner } from '@uiball/loaders'
import "./loader.scss";

const Loader = ({size}) => {
    return (
        <div className='loaderDiv' >
            <DotSpinner
                size={size}
                speed={0.7}
                color="white"
            />
        </div>
    )
}
export default Loader;