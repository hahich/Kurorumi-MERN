import { useEffect, useState } from "react"
import UploadCategoryModel from "../components/UploadCategoryModel"
import AxiosToastError from "../utils/AxiosToastError"
import Loading from "../components/Loading"
import NoData from "../components/NoData"
import Axios from "../utils/Axios"
import SummarryApi from "../common/SummaryApi"
import EditCategory from "../components/EditCategory"
import ConfirmBox from "../components/ConfirmBox"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  })

  const [openConfirmBox, setOpenConfirmBox] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  })

  const allCategory = useSelector(state => state.products.allCategory)

  useEffect(() => {
    setCategoryData(allCategory)
  }, [allCategory])

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummarryApi.getCategory,
      })
      const { data: responseData } = res;

      if (responseData.success && Array.isArray(responseData.data)) {
        setCategoryData(responseData.data)
      } else {
        setCategoryData([])
      }


    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleDeleteCategory = async () => {
    try {
      const res = await Axios({
        ...SummarryApi.deleteCategory,
        data: deleteCategory
      })

      const { data: responseData } = res

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBox(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button onClick={() => setOpenUploadCategory(true)}
          className="text-sm border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded border">
          Add Category
        </button>
      </div>
      {
        categoryData.length === 0 && !loading && <NoData />
      }

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {
          categoryData.map((category, index) => {
            return (
              <div key={category.id || index} className="w-[160px] h-full object-scale-down rounded shadow-lg group mx-auto">
                <div className=" flex flex-col items-center my-1">
                  <img src={category.image} alt="" className="max-w-[calc(100%-10%)] h-48 overflow-hidden object-scale-down" />
                  <p className="text-black text-center my-1">{category.name}</p>
                </div>

                <div className="items-center h-auto my-1 flex gap-2">
                  <button onClick={() => { setOpenEdit(true); setEditData(category); }} className="flex-1 hover:bg-blue-600 bg-blue-500 text-white font-medium mx-2 py-1 rounded">
                    Edit
                  </button>

                  <button onClick={() => {
                    setOpenConfirmBox(true);
                    setDeleteCategory(category);
                  }} className="flex-1 hover:bg-red-600 bg-red-500 text-white font-medium mx-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>

            )
          })
        }

      </div>

      {
        loading && (
          <Loading />
        )
      }

      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
        )
      }

      {
        openEdit && (
          <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
        )
      }

      {
        openConfirmBox && (
          <ConfirmBox close={() => setOpenConfirmBox(false)} confirm={handleDeleteCategory} cancel={() => setOpenConfirmBox(false)} />
        )
      }
    </section>
  )
}

export default Category