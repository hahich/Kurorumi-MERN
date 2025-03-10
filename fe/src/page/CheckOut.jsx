import React, { useState } from 'react'
import { displayPriceInVND } from '../utils/DisplayPriceInVNd'
import { useGlobalContext } from '../provider/GlobalProvider'
import Divider from '../components/Divider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummarryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"

const CheckOut = () => {
    const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()
    const [openAddress, setOpenAddress] = useState(false)
    const addressList = useSelector(state => state.addresses.addressList)
    const [selectedAddress, setSelectedAddress] = useState(0)
    const cartItemList = useSelector(state => state.cartItem.cart)
    const navigate = useNavigate()

    const handleCashOnDelivery = async () => {

        try {
            const res = await Axios({
                ...SummarryApi.CashOnDelivery,
                data: {
                    list_items: cartItemList,
                    addressId: addressList[selectedAddress]?._id,
                    subTotalAmt: totalPrice,
                    totalAmt: totalPrice,
                }
            })

            const { data: responseData } = res

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
                if (fetchOrder) {
                    fetchOrder()
                }
                navigate("/success", {
                    state: {
                        text: "Order Successfully"
                    }
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleOnlinePayment = async () => {
        try {
            toast.loading("Loading...")
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

            const stripePromise = await loadStripe(stripePublicKey)

            const res = await Axios({
                ...SummarryApi.PaymentUrl,
                data: {
                    list_items: cartItemList,
                    addressId: addressList[selectedAddress]?._id,
                    subTotalAmt: totalPrice,
                    totalAmt: totalPrice,
                }
            })

            const { data: responseData } = res

            stripePromise.redirectToCheckout({ sessionId: responseData.id })

            if (fetchCartItem) {
                fetchCartItem()
            }
            if (fetchOrder) {
                fetchOrder()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='bg-white'>
            <div className="container mx-auto p-4 flex w-full gap-5 flex-col lg:flex-row justify-between">
                <div className="w-full">
                    {/* address */}
                    <h3 className='text-lg font-semibold'>Choose your address</h3>

                    <div className="grid gap-4 p-2 border border-blue-500 rounded">
                        <div className="grid gap-2">
                            {
                                addressList.map((address, index) => {
                                    return (
                                        <label htmlFor={"address" + index} className={!address.status && "hidden"}>
                                            <div key={index} className="border rounded p-3 border-blue-500 flex gap-3 hover:bg-blue-50">
                                                <div className="">
                                                    <input type='radio' id={"address" + index} onChange={(e) => setSelectedAddress(e.target.value)} value={index} name='address' />
                                                </div>
                                                <div className="">
                                                    <p>{address.address_line}</p>
                                                    <p>{address.city}</p>
                                                    <p>{address.state}</p>
                                                    <p>{address.country} - {address.pincode}</p>
                                                    <p>{address.mobile}</p>
                                                </div>
                                            </div>
                                        </label>
                                    )
                                })
                            }
                        </div>

                        <div onClick={() => setOpenAddress(true)} className="cursor-pointer h-24 bg-blue-50 border-2 border-dashed rounded flex justify-center items-center">
                            Add address
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-md py-4 px-2 border-4 border-blue-500 rounded border-double">
                    {/* summarry */}
                    <h3 className='text-lg font-semibold'>Summarry</h3>
                    <Divider />
                    <div className="p-4">
                        <h3 className='font-semibold text-black mb-1'>Bill Details</h3>
                        <div className="flex gap-4 justify-between ml-1 border-b border-blue-500 mb-2">
                            <p>Items total</p>
                            <p className='flex items-center gap-2'>
                                {totalPrice < notDiscountTotalPrice && ( // Kiểm tra xem có discount hay không
                                    <span className='line-through text-neutral-400'>
                                        {displayPriceInVND(notDiscountTotalPrice)}
                                    </span>
                                )}
                                <span>{displayPriceInVND(totalPrice)}</span>
                            </p>
                        </div>

                        <div className="flex gap-4 justify-between ml-1 border-b border-blue-500 mb-2">
                            <p>Quantity total</p>
                            <p className='flex items-center gap-2'>
                                <span className=''>{totalQty} items</span>
                            </p>
                        </div>

                        <div className="flex gap-4 justify-between ml-1 border-b border-blue-500 mb-2">
                            <p>Delivery Charge</p>
                            <p className='flex items-center gap-2'>
                                <span className=''>Free</span>
                            </p>
                        </div>

                        <div className="font-semibold flex justify-between items-center gap-4 border-b border-blue-500 mb-2">
                            <p>Grand total</p>
                            <p>{displayPriceInVND(totalPrice)}</p>
                        </div>
                    </div>

                    <div className="w-full flex gap-4 flex-col">
                        <button onClick={handleOnlinePayment} className='border-2 font-semibold transition duration-300 border-blue-500 hover:bg-white hover:text-blue-500 py-2 px-4 bg-blue-500 text-white rounded'>Online Payment</button>
                        <button onClick={handleCashOnDelivery} className='border-2 font-semibold transition duration-300 border-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 text-blue-500 rounded'>Cash On Delivery</button>
                    </div>
                </div>
            </div>

            {
                openAddress && (
                    <AddAddress close={() => setOpenAddress(false)} />
                )
            }
        </section>
    )
}

export default CheckOut
