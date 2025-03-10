import { useEffect, useState } from "react"
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"
import SummarryApi from "../common/SummaryApi"
import Loading from "../components/Loading"
import ProductCardAdmin from "../components/ProductCardAdmin"
import { IoSearchSharp } from "react-icons/io5"
import EditProductsAdmin from "../components/EditProductsAdmin"

const ProductsAdmin = () => {
  const [productsData, setProductsData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductsData = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummarryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        }
      })

      const { data: responseData } = res

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage)
        setProductsData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductsData()
  }, [page])

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }

  }

  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    let flag = true

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductsData()
        flag = false
      }
    }, 300);

    return () => {
      clearTimeout(interval)
    }
  }, [search])

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full bg-blue-50 px-4 py-2 flex items-center gap-3 border rounded focus-within:border-blue-500">
          <IoSearchSharp size={25} />
          <input
            type="search"
            placeholder="Search products here ..."
            className="h-full outline-none bg-blue-50"
            onChange={handleOnChange}
            value={search}
          />
        </div>
      </div>
      {
        loading && (
          <Loading />
        )
      }

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {
              productsData.map((p, index) => {
                return (
                  <div className="flex justify-center items-center" key={index}>
                    <ProductCardAdmin data={p} fetchProductsData={fetchProductsData}/>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button onClick={handlePrevious} className="border border-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white text-blue-500 rounded transition duration-300">Previous</button>
          <button className="p-2 rounded bg-blue-500 text-white">{page}/{totalPageCount}</button>
          <button onClick={handleNext} className="border border-blue-500 px-4 py-1 hover:bg-blue-500 hover:text-white text-blue-500 rounded transition duration-300">Next</button>
        </div>
      </div>

    </section>
  )
}

export default ProductsAdmin