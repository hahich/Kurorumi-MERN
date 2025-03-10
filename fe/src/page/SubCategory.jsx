
import { useEffect, useState } from "react"
import UploadSubCategoryModel from "../components/UploadSubCategoryModel"
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"
import SummarryApi from "../common/SummaryApi"
import DisplayTable from "../components/DisplayTable"
import { createColumnHelper } from "@tanstack/react-table"
import ViewImage from "../components/ViewImage"
import { LuPencil } from "react-icons/lu"
import { MdDeleteOutline } from "react-icons/md"
import EditSubCategory from "../components/EditSubCategory"
import ConfirmBox from "../components/ConfirmBox"
import toast from "react-hot-toast"
import NoData from "../components/NoData"

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({ _id: "" })
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: "" })
  const [openDeleteConfirmBox, setDeleteConfirmBox] = useState(false)

  const columnHelper = createColumnHelper()

  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummarryApi.getSubCategory,
      })
      const { data: responseData } = res
      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <p>{row.original.name}</p>
        </div>
      )
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            src={row.original.image}
            alt={row.original.image}
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              setImageUrl(row.original.image)
            }}
          />
        </div>
      )
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          {row.original.category.map((c, index) => (
            <p key={c._id || index} className="shadow-md px-1 inline-block">{c.name}</p>
          ))}
        </div>
      )
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }}
            className="p-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 transition duration-300 hover:text-white">
            <LuPencil size={20} />
          </button>
          <button
            onClick={() => {
              setDeleteConfirmBox(true)
              setDeleteSubCategory(row.original)
            }}
            className="p-2 text-red-500 border border-red-500 hover:text-white hover:bg-red-500 transition duration-300 rounded-full">
            <MdDeleteOutline size={20} />
          </button>
        </div>
      )
    })
  ]

  const handleDeleteSubCategory = async () => {
    try {
      const res = await Axios({
        ...SummarryApi.deleteSubCategory,
        data: deleteSubCategory
      })
      const { data: responseData } = res
      if (responseData.success) {
        toast.success(responseData.message)
        fetchSubCategory()
        setDeleteConfirmBox(false)
        setDeleteSubCategory({ _id: "" })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="p-4">
      {/* Khi dữ liệu đang được tải, hiển thị thông báo Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      ) : (
        <>
          <div className="p-2 bg-white shadow-md flex items-center justify-between mb-4">
            <h2 className="font-semibold">Sub Category</h2>
            <button
              onClick={() => setOpenAddSubCategory(true)}
              className="text-sm border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded"
            >
              Add Sub Category
            </button>
          </div>
          {
            data && data.length > 0 ? (
              <div className="overflow-auto w-full max-w-[95vw]">
                <DisplayTable data={data} column={column} />
              </div>
            ) : (
              <NoData />
            )
          }


        </>
      )}

      {openAddSubCategory && (
        <UploadSubCategoryModel close={() => setOpenAddSubCategory(false)} fetchData={fetchSubCategory} />
      )}

      {imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl("")} />}

      {openEdit && (
        <EditSubCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchSubCategory} />
      )}

      {openDeleteConfirmBox && (
        <ConfirmBox
          cancel={() => setDeleteConfirmBox(false)}
          close={() => setDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  )
}

export default SubCategory