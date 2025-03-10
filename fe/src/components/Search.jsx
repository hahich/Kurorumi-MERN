import { useEffect, useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import useMobile from "../hooks/useMobile";

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])


    const redirectToSearchPage = () => {
        navigate("/search")
    }

    const handleOnChange = (e) => {
        const value = e.target.value

        const url = `/search?q=${value}`
        navigate(url)

    }
    return (
        <div className="w-full min-w-[300px] lg:min-w-[420px] mb-2 h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 group focus-within:border-blue-500">
            <div className="">
                {
                    !(isMobile && isSearchPage) ? (
                        <button className="flex items-center justify-center h-full p-3 group-focus-within:text-blue-500">
                            <IoMdSearch size={25} />
                        </button>
                    ) : (
                        <Link to={"/"} className="flex items-center justify-center h-full p-3 group-focus-within:text-blue-500">
                            <FaRegArrowAltCircleLeft size={25} />
                        </Link>
                    )
                }



            </div>

            <div className="w-full h-full me-2">
                {
                    !isSearchPage ? (
                        // not in search page
                        <div className="w-full h-full flex items-center" onClick={redirectToSearchPage} >
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search for "Laptop"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search for "Accensories"',
                                    1000,
                                    'Search for "Mobile"',
                                    1000,
                                    'Search for "Tablet"',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{ fontSize: '16px', display: 'inline-block' }}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        // when in search page
                        <div className="w-full h-full">
                            <input type="text" placeholder="Search"
                                className="bg-transparent w-full h-full outline-none"
                                autoFocus
                                defaultValue={searchText}
                                onChange={handleOnChange} />
                        </div>
                    )
                }
            </div>


        </div>
    )
}

export default Search