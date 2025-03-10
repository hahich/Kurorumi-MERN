import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await Axios({
        ...SummarryApi.login,
        data: data,
      })

      if (res.data.error) {
        toast.error(res.data.message)
      }

      if (res.data.success) {
        toast.success(res.data.message)
        localStorage.setItem('accessToken', res.data.data.accessToken)
        localStorage.setItem('refreshToken', res.data.data.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        })
        navigate("/")
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  const fillValue = Object.values(data).every(val => val)

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4 border border-red-500">
        <p className="text-center text-3xl font font-semibold">Login</p>

        <form action="" onSubmit={handleSubmit}>

          <div className="grid gap-2 mt-6">
            <label htmlFor="email">Email</label>
            <input type="email" autoFocus name="email" id="email" className="bg-blue-50 p-2 border rounded outline-none focus-within:border-blue-500" value={data.email} onChange={handleChange} placeholder="Enter your email" />
          </div>

          <div className="grid gap-2 mt-6">
            <label htmlFor="password">Password</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-500">
              <input type={showPassword ? "text" : "password"} autoFocus name="password" id="password" className="w-full outline-none" value={data.password} onChange={handleChange} placeholder="Enter your password" />
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

          <Link to={"/forgot-password"} className="hover:text-blue-500 block text-right mt-3">Forgot Password?</Link>

          <button disabled={!fillValue} className={`${fillValue ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-500"}  text-white rounded font-semibold w-full p-2 mt-3 leading-6 tracking-wide`}>
            Login
          </button>
        </form>

        <p className="mt-3 text-center lg:text-left">Don&apos;t have account? <Link to={"/register"} className="font-semibold text-blue-500 hover:text-blue-600">Register</Link></p>

      </div>
    </section>
  )
}

export default Login