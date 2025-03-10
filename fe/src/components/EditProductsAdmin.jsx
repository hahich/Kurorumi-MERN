import React, { useEffect } from 'react'
import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImg from "../utils/UploadImg"
import ViewImage from "../components/ViewImage"
import Loading from "../components/Loading"
import { MdDelete } from "react-icons/md"
import { useSelector } from 'react-redux'
import { IoMdCloseCircle } from "react-icons/io";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const EditProductsAdmin = ({ close, data: propsData, fetchProductsData }) => {
    const allCategory = useSelector(state => state.products.allCategory)
    const allSubCategory = useSelector(state => state.products.allSubCategory)
    const intialCategory = propsData.category.map(categoryId => allCategory.find(el => el._id === categoryId)).filter(Boolean)
    const intialSubCategory = propsData.subCategory.map(subCategoryId => allSubCategory.find(el => el._id === subCategoryId)).filter(Boolean)

    const [data, setData] = useState({
        _id: propsData._id,
        name: propsData.name,
        image: propsData.image,
        category: intialCategory || [],
        subCategory: intialSubCategory || [],
        unit: propsData.unit,
        stock: propsData.stock,
        price: propsData.price,
        discount: propsData.discount,
        descriptions: propsData.descriptions,
        more_detail: propsData.more_detail || {},
    })

    const [imgLoading, setImgLoading] = useState(false)
    const [imgFullUrl, setImgFullUrl] = useState("")
    const [selectCategory, setSelectCategory] = useState("")
    const [selectSubCategory, setSelectSubCategory] = useState("")
    const [openAddField, setOpenAddField] = useState(false)
    const [fieldName, setFiledName] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadImg = async (e) => {
        const files = Array.from(e.target.files);
        if (!files || files.length === 0) return;

        setImgLoading(true);
        try {
            // Upload từng file và thu thập kết quả trả về (giả sử UploadImg nhận 1 file object)
            const uploadedImages = await Promise.all(
                files.map(async (file) => {
                    const res = await UploadImg(file);
                    const { data: ImgResponse } = res;
                    return ImgResponse.data.url;
                })
            );
            // Update state bằng cách thêm mảng các url đã upload
            setData((prev) => ({
                ...prev,
                image: [...prev.image, ...uploadedImages]
            }));
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setImgLoading(false);
        }
    };

    const handleDeleteImg = async (index) => {
        data.image.splice(index, 1)
        setData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleRemoveCategory = async (index) => {
        data.category.splice(index, 1)
        setData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleRemoveSubCategory = async (index) => {
        data.subCategory.splice(index, 1)
        setData((prev) => {
            return {
                ...prev
            }
        })
    }

    const availableCategory = allCategory.filter(c =>
        !propsData.category.some(selected => selected._id === c._id) //some là để loại bỏ phần option đã chọn
    )

    const availableSubCategory = allSubCategory.filter(c =>
        !propsData.subCategory.some(selected => selected._id === c._id)
    )

    const handleAddField = () => {
        setData((prev) => {
            return {
                ...prev,
                more_detail: {
                    ...prev.more_detail,
                    [fieldName]: ""
                }
            }
        })
        setFiledName("")
        setOpenAddField(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await Axios({
                ...SummarryApi.updateProducts,
                data: data
            })

            const { data: responseData } = res

            if (responseData.success) {
                toast.success(responseData.message)
                if(close) {
                    close()
                }
                fetchProductsData()
                setData({
                    name: "",
                    image: [],
                    category: [],
                    subCategory: [],
                    unit: [],
                    stock: "",
                    price: "",
                    discount: "",
                    descriptions: "",
                    more_detail: {},
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    // useEffect(() => {
    //     const category = allCategory.find(el => el._id === propsData.category[0])
    //     console.log(propsData.category);

    //     setData((prev) => {
    //         return {
    //             ...prev,
    //             category: [...prev.category, category]
    //         }
    //     })
    //     setSelectCategory("")
    // }, [])
    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
            <div className="max-w-2xl bg-white w-full p-4 mx-auto rounded-lg shadow-lg overflow-y-auto h-full max-h-[95vh]">
                <section className=''>
                    <div className="p-2 bg-white shadow-md flex items-center justify-between">
                        <h2 className="font-semibold">Upload Product</h2>
                        <button onClick={close}>
                            <IoMdCloseCircle size={25} />
                        </button>
                    </div>

                    <div className="grid p-3">
                        <form action="" className="grid gap-4 text-left" onSubmit={handleSubmit}>
                            <div className="grid gap-1">
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Enter product name" value={data.name} onChange={handleChange} name="name" required
                                    className="bg-blue-50 p-2 outline-none border focus-within:border-blue-500 rounded" />
                            </div>

                            <div className="grid gap-1">
                                <label htmlFor="descriptions">Descriptions</label>
                                <textarea id="descriptions" type="text" placeholder="Enter your descriptions" value={data.descriptions} onChange={handleChange} name="descriptions" required
                                    className="bg-blue-50 p-2 outline-none border focus-within:border-blue-500 rounded resize-none" multiple rows={3}></textarea>
                            </div>

                            <div className="">
                                <p>Image</p>
                                <div className="">
                                    <label htmlFor="productImage" className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer">
                                        <div className="text-center flex justify-center items-center flex-col">
                                            {
                                                imgLoading ? <Loading /> : (
                                                    <div className="flex justify-center items-center flex-col">
                                                        <FaCloudUploadAlt size={35} />
                                                        <p>Upload Image</p>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <input type="file" id="productImage" className="hidden" onChange={handleUploadImg} multiple accept="image/*" />
                                    </label>

                                    {/* display upload image*/}
                                    <div className=" flex flex-wrap gap-4">
                                        {
                                            data.image.map((img, index) => {
                                                return (
                                                    <div className="relative mt-1 h-20 w-20 min-w-20 bg-blue-50 border group" key={img + index}>
                                                        <img
                                                            src={img}
                                                            alt={img}
                                                            className="w-full h-full object-scale-down cursor-pointer"
                                                            onClick={() => setImgFullUrl(img)}
                                                        />

                                                        <div onClick={() => handleDeleteImg(index)}
                                                            className="absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-600 rounded text-white cursor-pointer hidden group-hover:block">
                                                            <MdDelete />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-1">
                                <label htmlFor="">Category</label>
                                <div className="">
                                    <select name="" id="" className="bg-blue-50 border w-full p-2 rounded" value={selectCategory} onChange={(e) => {
                                        const value = e.target.value
                                        const category = allCategory.find(el => el._id === value)

                                        if (category && !data.category, includes(category)) {

                                            setData((prev) => {
                                                return {
                                                    ...prev,
                                                    category: [...prev.category, category]
                                                }
                                            })
                                            setSelectCategory("")
                                        }
                                    }}>
                                        <option value="">Select Category</option>
                                        {
                                            availableCategory.map((c, index) => {
                                                return (
                                                    <option value={c?._id} key={c._id + index}>{c.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <div className="flex flex-wrap gap-3">
                                        {data.category.map((c, index) => {
                                            return (
                                                <div className="text-sm gap-1 flex items-center bg-blue-50 mt-1" key={c._id + index + "productsection"}>
                                                    <p>{c.name}</p>
                                                    <div className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveCategory(index)}>
                                                        <IoMdCloseCircle size={20} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>


                                </div>
                            </div>

                            <div className="grid gap-1">
                                <label htmlFor="">Sub Category</label>
                                <div className="">
                                    <select name="" id="" className="bg-blue-50 border w-full p-2 rounded" value={selectSubCategory} onChange={(e) => {
                                        const value = e.target.value
                                        const subCategory = allSubCategory.find(el => el._id === value)
                                        if (subCategory && !data.subCategory.includes(subCategory)) {
                                            setData((prev) => {
                                                return {
                                                    ...prev,
                                                    subCategory: [...prev.subCategory, subCategory]
                                                }
                                            })
                                            setSelectSubCategory("")
                                        }
                                    }}>
                                        <option value="">Select Sub Category</option>
                                        {
                                            availableSubCategory.map((c, index) => {
                                                return (
                                                    <option value={c?._id} key={c._id + index}>{c.name}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <div className="flex flex-wrap gap-3">
                                        {data.subCategory.map((c, index) => {
                                            return (
                                                <div className="text-sm gap-1 flex items-center bg-blue-50 mt-1" key={c._id + index + "subCategorySection"}>
                                                    <p>{c.name}</p>
                                                    <div className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveSubCategory(index)}>
                                                        <IoMdCloseCircle size={20} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>


                                </div>
                            </div>

                            <div className="grid gap-1">
                                <label htmlFor="unit">Unit</label>
                                <input id="unit" type="text" placeholder="Enter product unit" value={data.unit} onChange={handleChange} name="unit" required
                                    className="bg-blue-50 p-2 outline-none border focus-within:border-blue-500 rounded" />
                            </div>

                            <div className="grid gap-1">
                                <label htmlFor="stock">Number of stock</label>
                                <input id="stock" type="number" placeholder="Enter product stock" value={data.stock} onChange={handleChange} name="stock" required
                                    className="bg-blue-50 p-2 outline-none border focus-within:border-blue-500 rounded" />
                            </div>

                            <div className="grid gap-1">
                                <label htmlFor="price">Price</label>
                                <input id="price" type="number" placeholder="Enter product price" value={data.price} onChange={handleChange} name="price" required
                                    className="bg-blue-50 p-2 outline-none border focus-within:border-blue-500 rounded" />
                            </div>

                            <div className="grid gap-1">
                                <label htmlFor="discount">Discount</label>
                                <input id="discount" type="number" placeholder="Enter product discount" value={data.discount} onChange={handleChange} name="discount" required
                                    className="bg-blue-50 p-2 outline-none border focus-within:border-blue-500 rounded" />
                            </div>

                            {/* Add more field */}
                            {
                                Object.keys(data.more_detail).map((k, index) => {
                                    return (
                                        <div className="grid gap-1" key={index}>
                                            <label htmlFor={k}>{k}</label>
                                            <input id={k} type="text" value={data?.more_detail[k]} onChange={(e) => {
                                                const value = e.target.value
                                                setData((prev) => {
                                                    return {
                                                        ...prev,
                                                        more_detail: {
                                                            ...prev.more_detail,
                                                            [k]: value
                                                        }
                                                    }
                                                })
                                            }}
                                                required
                                                className="bg-blue-50 p-2 outline-none border focus-within:border-blue-500 rounded" />
                                        </div>
                                    )
                                })
                            }

                            <div onClick={() => setOpenAddField(true)}
                                className="bg-blue-500 hover:bg-white hover:text-blue-500 rounded py-1 px-3 w-32 text-center font-semibold border border-blue-500 text-white cursor-pointer">
                                Add Fields
                            </div>

                            <button className="bg-blue-500 hover:bg-white py-2 rounded font-semibold border border-blue-500 text-white hover:text-blue-500">
                                Update Product
                            </button>
                        </form>
                    </div>

                    {
                        imgFullUrl && (
                            <ViewImage url={imgFullUrl} close={() => setImgFullUrl("")} />
                        )
                    }

                    {
                        openAddField && (
                            <AddFieldComponent
                                value={fieldName}
                                onChange={(e) => setFiledName(e.target.value)}
                                submit={handleAddField}
                                close={() => setOpenAddField(false)}
                            />
                        )
                    }
                </section>
            </div>
        </section>
    )
}

export default EditProductsAdmin
