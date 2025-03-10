import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import Search from './Search'
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { useEffect, useReducer, useState } from 'react';
import UserMenu from './UserMenu';
import { displayPriceInVND } from '../utils/DisplayPriceInVNd';
import { current } from '@reduxjs/toolkit';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItems from '../components/DisplayCartItems.jsx';

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const params = useLocation()
  const searchText = params.search.slice(3)
  const cartItem = useSelector(state => state.cartItem.cart)
  // const [totalPrice, setTotalPrice] = useState(0)
  // const [totalQty, setTotalQty] = useState(0)
  const { totalPrice, totalQty } = useGlobalContext()
  const [openCartMenu, setOpenCartMenu] = useState(false)

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }

    navigate("/user")
  }

  // total Item & total Price
  // useEffect(() => {
  //   const qty = cartItem.reduce((prev, curr) => {
  //     return prev + curr.quantity
  //   },0)
  //   setTotalQty(qty)

  //   const tPrice = cartItem.reduce((prev, curr) => {
  //     return prev + (curr.productId.price * curr.quantity)  
  //   },0)
  //   setTotalPrice(tPrice)
  // }, [cartItem])

  return (
    <header className="h-24 lg:h-20 shadow-lg sticky top-0 flex items-center justify-center flex-col gap-1 bg-white z-40">
      {
        !(isSearchPage && isMobile) && (
          <div className="container mx-auto h-full flex justify-between items-center px-2">
            <div className="">
              <Link to={""} className="">
                {/* logo */}
                <img src={logo} width={120} height={60} alt="" className='lg:block hidden' />
                <img src={logo} width={80} height={40} alt="" className='lg:hidden' />
              </Link>
            </div>

            {/* search */}
            <div className="hidden lg:block">
              <Search />
            </div>

            {/* login and my cart */}
            <div className="">
              {/* user icon only show up in mobile version */}
              <button className="lg:hidden text-neutral-600" onClick={handleMobileUser}>
                <FaUserCircle size={25} />
              </button>

              <div className="hidden lg:flex items-center gap-10">

                {
                  user?._id ? (
                    <div className="relative">
                      <div onClick={() => setOpenUserMenu(prev => !prev)} className="flex select-none items-center gap-1 cursor-pointer">
                        <p>Account</p>
                        {
                          openUserMenu ? (
                            <GoTriangleUp size={23} />

                          ) : (
                            <GoTriangleDown size={23} />
                          )
                        }
                      </div>
                      {
                        openUserMenu && (
                          <div className="absolute right-0 top-12">
                            <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                              <UserMenu close={handleCloseUserMenu} />
                            </div>
                          </div>
                        )
                      }

                    </div>
                  ) : (
                    <button className='text-lg px-2' onClick={redirectToLoginPage}>Login</button>
                  )
                }


                <button onClick={() => setOpenCartMenu(true)} className='flex items-center gap-2 bg-red-500 px-3 py-2 text-sm hover:bg-red-600 rounded text-white'>
                  <div className="animate-bounce">
                    <BsCart4 size={26} />
                  </div>
                  <div className="font-semibold text-left">
                    {
                      cartItem[0] ? (
                        <div className="">
                          <p>{totalQty} Items</p>
                          <p>{displayPriceInVND(totalPrice)}</p>
                        </div>
                      ) : (
                        <p>My Cart</p>
                      )
                    }
                  </div>
                </button>
              </div>
            </div>
          </div>
        )
      }

      <div className="container mx-auto px-2 lg:hidden block">
        <Search />
      </div>
      {
        openCartMenu && (
          <DisplayCartItems close={()=>setOpenCartMenu(false)}/>
        )
      }
    </header>
  )
}

export default Header