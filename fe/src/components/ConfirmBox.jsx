import PropTypes from "prop-types";

const ConfirmBox = ({ cancel, confirm }) => {
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center">
            <div className="bg-white w-full max-w-md p-4 rounded">
                <div className="flex justify-center items-center gap-3">
                    <h1 className="font-semibold text-2xl">Confirm Delete</h1>
                </div>
                <p className="my-4">Are you sure to delete ?</p>
                <div className="flex items-center justify-between">
                    <button onClick={cancel} className="px-3 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Cancel</button>
                    <button onClick={confirm} className="px-3 py-1 border rounded border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">Confirm</button>
                </div>
            </div>
        </div>
    )
}

ConfirmBox.propTypes = {
    cancel: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
};

export default ConfirmBox