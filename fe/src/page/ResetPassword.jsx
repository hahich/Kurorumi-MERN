import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import SummarryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"
import toast from "react-hot-toast"

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }

        if (location?.state?.email) {
            setData((prev) => {
                return {
                    ...prev,
                    email: location?.state?.email,
                }
            })
        }
    }, [])

    const fillValue = Object.values(data).every(val => val)

    const handleChange = (e) => {
        const { name, value } = e.target
        const noUpperCase = name === "email" ? value.trim().toLowerCase() : value

        setData((prev) => {
            return {
                ...prev,
                [name]: noUpperCase
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await Axios({
                ...SummarryApi.reset_password,
                data: data,
            })

            if (res.data.error) {
                toast.error(res.data.message)
            }

            if (res.data.success) {
                toast.success(res.data.message),
                    navigate("/login"),
                    setData({
                        email: "",
                        newPassword: "",
                        confirmPassword: ""
                    })

            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="container w-full mx-auto px-2">
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4 border border-red-500">
                <p className="text-center text-3xl font font-semibold">Enter Your New Password</p>

                <form action="" onSubmit={handleSubmit}>

                    <div className="grid gap-2 mt-6">
                        <label htmlFor="email">Email</label>
                        <input type="email" disabled name="email" id="email" className="bg-blue-50 p-2 border rounded outline-none focus-within:border-blue-500" value={data.email} onChange={handleChange} placeholder="Enter your email" />
                    </div>

                    <div className="grid gap-2 mt-6">
                        <label htmlFor="password">New Password</label>
                        <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-500">
                            <input type={showPassword ? "text" : "password"} name="newPassword" id="password" className="w-full outline-none" value={data.newPassword} onChange={handleChange} placeholder="Enter your new password" />
                            <div className="cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                                {
                                    showPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2 mt-6">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-500">
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" className="w-full outline-none" value={data.confirmPassword} onChange={handleChange} placeholder="Enter your confirm password" />
                            <div className="cursor-pointer" onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {
                                    showConfirmPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!fillValue} className={`${fillValue ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-500"}  text-white rounded font-semibold w-full p-2 mt-3 leading-6 tracking-wide`}>
                        Change Password
                    </button>
                </form>

                <p className="mt-3 text-center lg:text-left">Already have account? <Link to={"/login"} className="font-semibold text-blue-500 hover:text-blue-600">Login</Link></p>

            </div>
        </section>
    )
}

export default ResetPassword