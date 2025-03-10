import { useEffect, useState } from "react"
import CardLoading from "../components/CardLoading"
import SummarryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import AxiosToastError from "../utils/AxiosToastError"
import CardProducts from "../components/CardProducts"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from "react-router-dom"
import noData from "../assets/nothingImg/nothing-here-flat-illustration_418302-77.avif"

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingArray = new Array(10).fill(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const params = useLocation()

  const searchText = params?.search?.slice(3)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummarryApi.searchProducts,
        data: {
          search: searchText,
          page: page
        }
      })

      const { data: responseDatta } = res

      if (responseDatta.success) {
        if (responseDatta.page == 1) {
          setData(responseDatta.data)
        } else {
          setData((prev) => {
            return [
              ...prev,
              ...responseDatta.data
            ]
          })
        }

        setTotalPage(responseDatta.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, searchText])

  const handlefetchMore = () => {
    if (totalPage > page) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <section className="">
      <div className="container mx-auto p-2">
        <p className="font-semibold">Search result: {data.length}</p>

        {
          // no data
          !data[0] && !loading && (
            <div className="flex flex-col justify-center items-center max-w-sm max-h-sm mx-auto">
              <img src={noData} alt="" className="w-full h-full" />
              <p className="font-semibold my-2">No Data found</p>
            </div>
          )
        }
        <InfiniteScroll dataLength={data.length} next={handlefetchMore} hasMore={true}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-4 gap-2">

            {
              data.map((p, index) => {
                return (
                  <CardProducts data={p} key={p._id + "search" + index} />
                )
              })
            }

            {/* loading data */}
            {
              loading && (
                loadingArray.map((_, index) => {
                  return (
                    <CardLoading key={"loadingSearchPage" + index} />
                  )
                })
              )
            }
          </div>
        </InfiniteScroll>
      </div>
    </section>
  )
}

export default SearchPage