import { useEffect, useRef, useState } from "react"
import { Link, redirect } from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"
import SummarryApi from "../common/SummaryApi"
import CardLoading from "./CardLoading"
import CardProducts from "./CardProducts"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import propTypes from "prop-types"
import { useSelector } from "react-redux"
import { validURLConvert } from "../utils/validURL.Convert"

const CategoryWiseProductsDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const loadingCardNumber = new Array(6).fill(null)
    const subCategoryData = useSelector((state) => state.products.allSubCategory);

    const fetchCategoryWiseProducts = async () => {
        try {
            setLoading(true)
            const res = await Axios({
                ...SummarryApi.getProductsByCategory,
                data: {
                    id: id
                }
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
        fetchCategoryWiseProducts()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 300;
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 300;
    }

    const handleRedicrectToProductsList = () => {
        const subCategory = subCategoryData.find(sub => {
            const filterData = sub.category.some(c => {
                return c._id == id
            })

            return filterData ? true : null
        })

        const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subCategory?.name)}-${subCategory?._id}`
        return url
    }

    const redirectURL = handleRedicrectToProductsList()

    return (
        <div>
            <div className="">
                <div className="container mx-auto p-4 flex items-center justify-between">
                    <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
                    <Link to={redirectURL} className="text-blue-500 hover:text-blue-600">See All</Link>
                </div>

                <div className="relative flex items-center">
                    <div className="flex items-center mx-auto px-4 gap-4 md:gap-6 lg:gap-9 container lg:overflow-hidden overflow-x-scroll scrollbar-none scroll-smooth" ref={containerRef}>
                        {
                            loading &&
                            loadingCardNumber.map((_, index) => {
                                return (
                                    <CardLoading key={"CategoryWiseProductsDisPlay123" + index} />
                                )
                            })
                        }

                        {
                            data.map((p, index) => {
                                return (
                                    <CardProducts data={p} key={p._id + "CategoryWiseProductsDisPlay" + index} />
                                )
                            })
                        }
                    </div>

                    <div className="absolute left-0 right-0 container hidden lg:flex justify-between mx-auto">
                        <button onClick={handleScrollLeft} className="z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-blue-500 hover:text-white transition duration-300">
                            <FaAngleLeft />
                        </button>

                        <button onClick={handleScrollRight} className="z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-blue-500 hover:text-white transition duration-300">
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

CategoryWiseProductsDisplay.propTypes = {
    id: propTypes.object.isRequired,
    name: propTypes.object.isRequired
}

export default CategoryWiseProductsDisplay