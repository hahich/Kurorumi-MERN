import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { FaShoppingCart } from "react-icons/fa";
import { displayPriceInVND } from '../utils/DisplayPriceInVND';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartMobileLink = () => {
    const { totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)

    return (
        <>
            {
                cartItem[0] && (
                    <div className='p-2 sticky bottom-4'>
                        <div className="bg-blue-500 px-2 py-1 rounded sticky text-white text-sm lg:hidden flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-400 rounded w-fit">
                                    <FaShoppingCart />
                                </div>

                                <div className="text-xs">
                                    <p>{totalQty} Items</p>
                                    <p>{displayPriceInVND(totalPrice)}</p>
                                </div>
                            </div>

                            <Link to={"/cart"}>
                                <span className='text-sm'>View Cart</span>
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )

}

export default CartMobileLink
