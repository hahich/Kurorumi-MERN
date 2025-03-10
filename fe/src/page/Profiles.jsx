import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import UserProfileAvatarUpload from "../components/UserProfileAvatarUpload";
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Profiles = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [openProfileAvatarUpload, setOpenProfileAvatarUpload] = useState(false)
    const [userData, setUserData] = useState(({
        name: user.name,
        email: user.email,
        mobile: user.mobile
    }))

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile
        })
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await Axios({
                ...SummarryApi.updateUserDetails,
                data: userData
            })

            const { data: responseData } = res

            if (responseData.success) {
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4">

            {/* profile upload and display img */}
            <div className="w-20 h-20 flex items-center justify-center drop-shadow-lg mx-4">
                {
                    user.avatar ? (
                        <img src={user.avatar} alt="User Avatar" className="w-full h-full rounded-full" />
                    ) : (
                        <FaUserCircle size={60} />
                    )
                }
            </div>

            <button onClick={() => setOpenProfileAvatarUpload(true)}
                className="mt-3 w-min-20 text-sm border transition duration-300 border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-full">
                Change Picture
            </button>

            {
                openProfileAvatarUpload && (
                    <UserProfileAvatarUpload close={() => (setOpenProfileAvatarUpload(false))} />
                )
            }

            {/* name, mobile, email, change password */}
            <form action="" className="my-4 grid gap-4" onSubmit={handleSubmit}>
                <div className="grid">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="rounded p-2 bg-blue-50 outline-none border focus-within:border-blue-500 capitalize"
                        onChange={handleOnChange}
                        value={userData.name}
                        name="name"
                        required />
                </div>

                <div className="grid">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        className="rounded p-2 bg-blue-50 outline-none border focus-within:border-blue-500"
                        onChange={handleOnChange}
                        value={userData.email}
                        name="email"
                        required />
                </div>

                <div className="grid">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        placeholder="Enter your mobile"
                        className="rounded p-2 bg-blue-50 outline-none border focus-within:border-blue-500"
                        onChange={handleOnChange}
                        value={userData.mobile}
                        name="mobile"
                        required />
                </div>

                <button className="border px-4 py-2 font-semibold border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300">
                    {
                        loading ? "Loading..." : "Submit"
                    }
                </button>
            </form>
        </div>
    )
}

export default Profiles