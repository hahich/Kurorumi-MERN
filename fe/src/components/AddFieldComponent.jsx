import { IoMdCloseCircle } from "react-icons/io"
import PropTypes from 'prop-types';

const AddFieldComponent = ({ close, value, onChange, submit }) => {
    return (
        <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-65 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded p-4 w-full max-w-md">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="font-semibold">Add Field</h1>
                    <button onClick={close}>
                        <IoMdCloseCircle size={25} />
                    </button>
                </div>
                <input
                    type="text"
                    className="bg-blue-50 my-3 p-2 border outline-none focus-within:border-blue-500 rounded w-full"
                    placeholder="Enter Field Name"
                    value={value}
                    onChange={onChange}
                />
                <button onClick={submit}
                    className="bg-blue-500 px-4 py-2 rounded mx-auto w-fit block text-white hover:bg-white hover:text-blue-500 border border-blue-500">
                    Add Field
                </button>
            </div>
        </section>
    )
}

AddFieldComponent.propTypes = {
    close: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
}

export default AddFieldComponent