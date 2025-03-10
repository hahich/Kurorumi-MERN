import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

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

    if (data.password !== data.confirmPassword) {
      toast.error(
        "password and confirm password must be same"
      )
      return
    }

    try {
      const res = await Axios({
        ...SummarryApi.register,
        data: data,
      })

      if (res.data.error) {
        toast.error(res.data.message)
      }

      if (res.data.success) {
        toast.success(res.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        navigate("/login")
      }

    } catch (error) {
      AxiosToastError(error)
    }



  }

  const fillValue = Object.values(data).every(val => val)

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4 border border-red-500">
        <p className="text-center text-3xl font font-semibold">Welcome to Kurotumi</p>

        <form action="" onSubmit={handleSubmit}>
          <div className="grid gap-2 mt-6">
            <label htmlFor="name">Name</label>
            <input type="text" autoFocus name="name" id="name" className="bg-blue-50 p-2 border rounded outline-none focus-within:border-blue-500" value={data.name} onChange={handleChange} placeholder="Enter your name" />
          </div>

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

          <div className="grid gap-2 mt-6">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-500">
              <input type={showConfirmPassword ? "text" : "password"} autoFocus name="confirmPassword" id="confirmPassword" className="w-full outline-none" value={data.confirmPassword} onChange={handleChange} placeholder="Enter your Confirm Password" />
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

          <button disabled={!fillValue} className={`${fillValue ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-500"}  text-white rounded font-semibold w-full p-2 mt-6 leading-6 tracking-wide`}>
            Register
          </button>
        </form>

        <p className="mt-3">Already have account? <Link to={"/login"} className="font-semibold text-blue-500 hover:text-blue-600">Login</Link></p>

      </div>
    </section>
  )
}

export default Register