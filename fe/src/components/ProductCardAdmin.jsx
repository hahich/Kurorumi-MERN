import propTypes from "prop-types"
import EditProductsAdmin from "./EditProductsAdmin"
import { useState } from "react"
import SummarryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import AxiosToastError from "../utils/AxiosToastError"
import toast from "react-hot-toast"

const ProductCardAdmin = ({ data, fetchProductsData }) => {
    const [editOpen, setEditOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const handleDelete = async () => {
        try {
            const res = await Axios({
                ...SummarryApi.deleteProducts,
                data: {
                    _id: data._id
                }
            })

            const { data: responseData } = res

            if (responseData.success) {
                toast.success(responseData.message)
                if(fetchProductsData) {
                    fetchProductsData()
                }
                setOpenDelete(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <div className="w-full p-4 bg-white rounded text-center shadow-lg">
            <div className="">
                <img src={data.image[0]} alt={data.name}
                    className="h-36 w-36 object-scale-down"
                />
            </div>

            <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
            <p className="text-slate-400">{data?.unit}</p>
            <div className="flex justify-between items-center gap-2 py-2">
                <button onClick={() => setEditOpen(true)} className="border px-2 text-sm rounded hover:text-white hover:bg-blue-500 border-blue-500">Edit</button>
                <button onClick={() => setOpenDelete(true)} className="border px-2 text-sm rounded hover:text-white hover:bg-red-500 border-red-500">Delete</button>
            </div>

            {
                editOpen && (
                    <EditProductsAdmin fetchProductsData={fetchProductsData} data={data} close={() => setEditOpen(false)} />
                )
            }

            {
                openDelete && (
                    <section className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center">
                        <div className="bg-white p-4 w-full max-w-md">
                            <div className="font-semibold text-xl flex justify-center items-center gap-3">
                                <h3>Confirm Delete</h3>
                            </div>
                            <p className="py-2">Do you really want to delete ?</p>
                            <div className="flex justify-between items-center">
                                <button onClick={() => setOpenDelete(false)} className="px-3 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Cancel</button>
                                <button onClick={handleDelete} className="px-3 py-1 border rounded border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">Delete</button>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    )
}

ProductCardAdmin.propTypes = {
    data: propTypes.object.isRequired,
}

ProductCardAdmin.defaultProps = {
    data: {},
}

export default ProductCardAdmin