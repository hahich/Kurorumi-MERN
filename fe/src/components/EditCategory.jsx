import { useState } from "react";
import uploadImg from "../utils/UploadImg";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoMdCloseCircle } from "react-icons/io";
import PropTypes from "prop-types";

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
    const [data, setData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image
    });

    const [loading, setLoading] = useState(false);

    const handleUploadCategoryImg = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setLoading(true)
        const res = await uploadImg(file);
        const { data: ImgRes } = res;
        setLoading(false)

        setData((prev) => ({
            ...prev,
            image: ImgRes.data.url
        }));
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await Axios({
                ...SummarryApi.updateCategory,
                data: data,
            });
            const { data: responseData } = res;
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-4xl w-full p-4 rounded ">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Update Category</h1>
                    <button onClick={close} className="w-fit block ml-auto">
                        <IoMdCloseCircle size={25} />
                    </button>
                </div>
                <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="categoryName">Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter Category Name"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className="bg-blue-50 p-2 border border-blue-500 rounded outline-none"
                        />
                    </div>
                    <div className="grid gap-1">
                        <p>Image</p>
                        <div className="flex gap-4 flex-col lg:flex-row items-center">
                            <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                                {data.image ? (
                                    <img alt="Category" src={data.image} className="w-full h-full object-scale-down" />
                                ) : (
                                    <p className="text-sm">No Image</p>
                                )}
                            </div>
                            <label htmlFor="uploadCategoryImage">
                                <div className={`${!data.name ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} px-4 py-2 rounded text-white cursor-pointer`}>
                                    {
                                        loading ? "Loading..." : "Upload Image"
                                    }
                                </div>
                                <input disabled={!data.name} onChange={handleUploadCategoryImg} type="file" id="uploadCategoryImage" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <button
                        className={`${data.name && data.image ? "border-blue-500 hover:text-white hover:bg-blue-600 cursor-pointer" : "bg-gray-500"} text-black rounded border font-semibold py-2`}
                        disabled={loading || !(data.name && data.image)}>
                        Update Category
                    </button>
                </form>
            </div>
        </section>
    );
}

EditCategory.propTypes = {
    close: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string
    }).isRequired,
};

export default EditCategory;