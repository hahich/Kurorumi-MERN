import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import uploadImg from "../utils/UploadImg";
import { useSelector } from 'react-redux'
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummarryApi from "../common/SummaryApi";

const UploadSubCategoryModel = ({ close, fetchData }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })

    const allCategory = useSelector(state => state.products.allCategory)

    const handleChange = (e) => {
        const { name, value } = e.target

        setSubCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0]

        if (!file) {
            return
        }

        const res = await uploadImg(file)
        const { data: ImgRes } = res;

        setSubCategoryData((prev) => {
            return {
                ...prev,
                image: ImgRes.data.url
            }
        })
    }

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(el => el._id === categoryId)
        subCategoryData.category.splice(index, 1)
        setSubCategoryData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault();

        try {
            const res = await Axios({
                ...SummarryApi.createSubCategory,
                data: subCategoryData
            })

            const { data: responseData } = res

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchData) {
                    fetchData()
                }
                if (close) {
                    close()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white p-4 rounded">
                <div className=" flex justify-between items-center">
                    <h1 className="font-semibold">Add Sub Category</h1>
                    <button>
                        <IoMdCloseCircle size={25} onClick={close} />
                    </button>
                </div>

                <form action="" className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
                    <div className="grid gap-1">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" value={subCategoryData.name} onChange={handleChange} type="text" className="p-3 bg-blue-50 border outline-none focus-within:border-blue-500 rounded" />
                    </div>

                    <div className="grid gap-1">
                        <p>Image</p>
                        <div className="flex flex-col gap-3 lg:flex-row items-center">
                            <div className="border h-36 w-full lg:w-36 bg-blue-50 flex justify-center items-center">
                                {
                                    !subCategoryData.image ? (
                                        <p className="text-sm text-neutral-500">No Image</p>
                                    ) : (
                                        <img
                                            alt="SubCategory"
                                            src={subCategoryData.image}
                                            className="w-full h-full object-scale-down"
                                        />
                                    )
                                }
                            </div>

                            <label htmlFor="uploadSubCategoryImage">
                                <div className="px-4 py-1 border border-blue-500 rounded hover:bg-blue-500 hover:text-white cursor-pointer">
                                    Upload Image
                                </div>

                                <input type="file" id="uploadSubCategoryImage" className="hidden" onChange={handleUploadSubCategoryImage} />
                            </label>

                        </div>
                    </div>

                    <div className="grid gap-1 focus-within:border-blue-500">
                        <label htmlFor="">Select Category</label>

                        <div className="border border-blue-500 rounded p-2">
                            {/* display value */}
                            <div className="flex flex-wrap gap-2">
                                {
                                    subCategoryData.category.map((cat, index) => {
                                        return (
                                            <div key={cat._id + "selectedValue" || index} className="bg-white shadow-md px-1 m-1 rounded flex items-center gap-2 cursor-pointer">
                                                {cat.name}
                                                <div onClick={() => handleRemoveCategorySelected(cat._id)}>
                                                    <IoMdCloseCircle size={20} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/* select category */}
                            <select name="" id="" className="bg-blue-50 border p-2 w-full bg-transparent outline-none" defaultValue={""} onChange={(e) => {
                                const value = e.target.value;
                                const categoryDetails = allCategory.find((el) => el._id === value);
                                if (!categoryDetails) return;

                                const alreadySelected = subCategoryData.category.some(
                                    (cat) => cat._id === categoryDetails._id
                                );
                                if (alreadySelected) {
                                    toast.error("Category already selected")
                                    return;
                                }
                                setSubCategoryData((prev) => ({
                                    ...prev,
                                    category: [...prev.category, categoryDetails],
                                }))
                            }}>
                                <option value={""} disabled>Select Category</option>
                                {
                                    allCategory.map((category, index) => {
                                        return (
                                            <option value={category?._id} key={category._id + "subcategory" || index}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button
                        className={`${!(subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0]) ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"} font-semibold px-3 py-1 border`}>
                        Submit
                    </button>
                </form>
            </div>
        </section>
    )
}

UploadSubCategoryModel.propTypes = {
    close: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
}

export default UploadSubCategoryModel