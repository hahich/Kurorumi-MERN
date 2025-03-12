import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { displayPriceInVND } from '../utils/DisplayPriceInVND'
import { useSelector } from 'react-redux'
import AddToCartBtn from './AddToCartBtn'
import { priceWithDiscount } from '../utils/PriceWithDiscount'
import emtyCart from "../assets/nothingImg/11329060.png"
import toast from 'react-hot-toast'

const DisplayCartItems = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckOutPage = () => {
        if (user?._id) {
            navigate("/checkout")
            if (close) {
                close()
            }
            return
        }
        toast("Please Login")
    }


    return (
        <section className='bg-black fixed top-0 bottom-0 right-0 left-0 bg-opacity-60 z-50'>
            <div className="bg-white w-full lg:max-w-sm min-h-screen max-h-screen ml-auto">
                <div className="flex items-center gap-3 p-3 shadow justify-between">
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoMdClose onClick={close} size={25} />
                    </Link>
                    <button className='hidden lg:block'>
                        <IoMdClose size={25} onClick={close} />
                    </button>
                </div>

                <div className="min-h-[80vh] lg:min-h-[85vh] h-full max-h-[calc(100vh-150px)] p-2 flex flex-col gap-4">
                    {/* display items */}

                    {
                        cartItem[0] ? (
                            <>
                                <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                                    <p>Your total savings</p>
                                    <p>{displayPriceInVND(notDiscountTotalPrice - totalPrice)}</p>
                                </div>

                                <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item, index) => {
                                                return (
                                                    <div key={item?._id + index + "cartItemDisplay"} className="flex w-full gap-2">
                                                        <div className="w-16 h-16 min-h-16 min-w-16 border rounded flex items-center justify-center">
                                                            <img src={item?.productId?.image[0]} alt="" className='object-cover' />
                                                        </div>

                                                        <div className="w-full max-w-sm">
                                                            <p className='text-sm text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-sm text-slate-400'>{item?.productId?.unit}</p>
                                                            <p className='font-semibold'>{displayPriceInVND(priceWithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                        </div>

                                                        <div className="">
                                                            <AddToCartBtn data={item?.productId} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>

                                <div className="p-4">
                                    <h3 className='font-semibold text-black'>Bill Details</h3>
                                    <div className="flex gap-4 justify-between ml-1">
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

                                    <div className="flex gap-4 justify-between ml-1">
                                        <p>Quantity total</p>
                                        <p className='flex items-center gap-2'>
                                            <span className=''>{totalQty} items</span>
                                        </p>
                                    </div>

                                    <div className="flex gap-4 justify-between ml-1">
                                        <p>Delivery Charge</p>
                                        <p className='flex items-center gap-2'>
                                            <span className=''>Free</span>
                                        </p>
                                    </div>

                                    <div className="font-semibold flex justify-between items-center gap-4">
                                        <p>Grand total</p>
                                        <p>{displayPriceInVND(totalPrice)}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white flex justify-center items-center flex-col">
                                <img src={emtyCart} alt="" className='h-full w-full object-scale-down' />
                                <Link onClick={close} to={"/"} className='font-semibold bg-blue-500 py-1 px-2 text-white rounded'>Shop Now</Link>
                            </div>
                        )
                    }
                </div>

                {
                    cartItem[0] && (
                        <div className="p-2">
                            <div className="bg-blue-500 text-white p-4 lg:text-base text-sm font-bold static bottom-3 rounded flex items-center gap-4 justify-between py-4">
                                <div className="">
                                    {displayPriceInVND(totalPrice)}
                                </div>

                                <button onClick={redirectToCheckOutPage} className=''>Proceed</button>
                            </div>
                        </div>
                    )
                }

            </div>
        </section>
    )
}

export default DisplayCartItems
