import { IoMdCloseCircle } from "react-icons/io"
import PropTypes from "prop-types"

const ViewImage = ({ url, close }) => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="w-full max-w-md p-4 bg-white max-h-[100vh]">
                <button onClick={close} className="ml-auto block w-fit mb-2">
                    <IoMdCloseCircle size={25}/>
                </button>
                <img src={url} alt="Full Screen" className="w-full h-full object-scale-down" />
            </div>
        </div>
    )
}

ViewImage.propTypes = {
    url: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
}

export default ViewImage