import { createContext, useContext, useEffect, useState } from "react";
import SummarryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemsCart } from "../store/cartProductsCart";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice"

export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0)
    const user = useSelector(state => state.user)

    const fetchCartItem = async () => {
        try {
            const res = await Axios({
                ...SummarryApi.getCartItem,
            })

            const { data: responseData } = res
            if (responseData.success) {
                dispatch(handleAddItemsCart(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const upddateCartItem = async (id, qty) => {
        try {
            const res = await Axios({
                ...SummarryApi.updateCartItem,
                data: {
                    _id: id,
                    qty: qty,
                }
            })

            const { data: responseData } = res
            if (responseData.success) {
                // toast.success(responseData.message)
                fetchCartItem()
                return responseData
            }
        } catch (error) {
            AxiosToastError(error)
            return error
        }
    }

    const deleteCartItem = async (cartId) => {
        try {
            const res = await Axios({
                ...SummarryApi.deleteCartItem,
                data: {
                    _id: cartId
                }
            })
            const { data: responseData } = res

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCartItem()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(() => {
        const qty = cartItem.reduce((prev, curr) => {
            return prev + curr.quantity
        }, 0)
        setTotalQty(qty)

        const tPrice = cartItem.reduce((prev, curr) => {
            return prev + (Number(priceWithDiscount(curr.productId.price, curr.productId.discount)) * curr.quantity)
        }, 0)
        setTotalPrice(tPrice)

        const notDiscountPrice = cartItem.reduce((prev, curr) => {
            return prev + (Number(curr.productId.price) * curr.quantity)
        }, 0)
        setNotDiscountTotalPrice(notDiscountPrice)
    }, [cartItem])

    const handleLogout = () => {
        localStorage.clear()
        dispatch(handleAddItemsCart([]))
    }

    const fetchAddress = async () => {
        try {
            const res = await Axios({
                ...SummarryApi.getAddress
            })

            const { data: responseData } = res

            if (responseData.success) {
                dispatch(handleAddAddress(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const fetchOrder = async () => {
        try {
            const res = await Axios({
                ...SummarryApi.getOrderDetails,
            })
            const { data: responseData } = res

            if (responseData.success) {
                dispatch(setOrder(responseData.data))
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCartItem()
        handleLogout()
        fetchAddress()
        fetchOrder()
    }, [user])

    return (
        <GlobalContext.Provider value={{ fetchCartItem, upddateCartItem, deleteCartItem, totalPrice, totalQty, notDiscountTotalPrice, fetchAddress, fetchOrder }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider