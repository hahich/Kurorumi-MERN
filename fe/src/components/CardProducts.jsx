import { Link } from "react-router-dom"
import { displayPriceInVND } from "../utils/DisplayPriceInVNd"
import { validURLConvert } from "../utils/validURL.Convert"
import propTypes from "prop-types"
import { priceWithDiscount } from "../utils/PriceWithDiscount"
import SummarryApi from "../common/SummaryApi"
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useGlobalContext } from "../provider/GlobalProvider"
import AddToCartBtn from "./AddToCartBtn"

const CardProducts = ({ data }) => {
    const url = `/products/${validURLConvert(data._id)}`
    const [loading, setLoading] = useState(false)

    return (
        <Link to={url} className="border lg:p-2 grid gap-2 lg:gap-3 rounded bg-white">
            <div className="max-h-24 m-2 lg:w-full min-w-60 flex justify-center items-center">
                <img src={data.image[0]} alt="" className="w-full h-full object-scale-down" />
            </div>

            <div className="flex items-center gap-2">
                <div className="mx-2 p-[0.5px] rounded text-xs w-fit px-2 text-blue-500 bg-blue-50">
                    10min
                </div>

                <div>
                    {
                        Boolean(data.discount) && (
                            <p className="text-xs mx-2 p-[0.5px] rounded-full w-fit px-2 text-blue-500 bg-blue-100">{data.discount}% discount</p>
                        )
                    }
                </div>
            </div>

            <div className="mx-2 px-1 font-medium text-ellipsis lg:text-base text-sm line-clamp-2">
                {data.name}
            </div>

            <div className="mx-2 px-2 text-sm lg:text-base rounded flex items-center gap-1">
                {data.unit}
            </div>

            <div className="flex lg:items-center gap-2 lg:justify-between md:flex-row flex-col">
                <div className="mx-2 px-1 rounded text-sm lg:text-base font-semibold">
                    {displayPriceInVND(priceWithDiscount(data.price, data.discount))}
                </div>

                <div className="">
                    {
                        data.stock == 0 ? (
                            <p className="px-2 mx-1 mb-1 py-2 rounded text-sm lg:m-0 lg:text-base font-semibold text-red-500">
                                Out of stock
                            </p>
                        ) : (
                            <AddToCartBtn data={data} />
                        )
                    }

                </div>
            </div>

        </Link>
    )
}

CardProducts.propTypes = {
    data: propTypes.object.isRequired
}

export default CardProducts