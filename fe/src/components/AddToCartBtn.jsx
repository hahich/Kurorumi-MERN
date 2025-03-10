import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummarryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider'
import Loading from "./Loading"
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

const AddToCartBtn = ({ data }) => {
    const { fetchCartItem, upddateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailabel, setAvailabel] = useState(false)
    const [qty, setQty] = useState(1)
    const [cartItemDetails, setCartItemDetails] = useState()

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)
            const res = await Axios({
                ...SummarryApi.addToCart,
                data: {
                    productID: data?._id
                }
            })

            const { data: responseData } = res
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    // checking cartItem 
    useEffect(() => {
        const checkingItem = cartItem.some(item => item.productId._id === data._id)
        setAvailabel(checkingItem)

        const product = cartItem.find(item => item.productId._id === data._id)

        setQty(product?.quantity)
        setCartItemDetails(product)
    }, [data, cartItem])

    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const res = await upddateCartItem(cartItemDetails?._id, qty + 1)

        if (res) {
            toast.success("item added")
        }
    }

    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (qty === 1) {
            deleteCartItem(cartItemDetails?._id)
        } else {
           const res = await upddateCartItem(cartItemDetails?._id, qty - 1)

            if (res) {
                toast.success("item remove")
            }
        }
    }

    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailabel ? (
                    <div className="flex">
                        <button onClick={decreaseQty} className='border px-2 bg-blue-500 text-white rounded'>-</button>
                        <p className='px-2 font-semibold'>{qty}</p>
                        <button onClick={increaseQty} className='border px-2 bg-blue-500 text-white rounded'>+</button>
                    </div>
                ) : (
                    <button onClick={handleAddToCart} className="px-2 bg-blue-500 hover:bg-blue-600 text-center lg:m-0 mr-2 mb-2 py-1 text-white rounded cursor-pointer">
                        {loading ? <Loading /> : "Add"}
                    </button>
                )
            }
        </div>
    )
}

export default AddToCartBtn
