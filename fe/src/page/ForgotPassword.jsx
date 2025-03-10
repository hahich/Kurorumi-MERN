import { useState } from "react"
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  })

  const navigate = useNavigate()

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
        ...SummarryApi.forgot_password,
        data: data,
      })

      if (res.data.error) {
        toast.error(res.data.message)
      }

      if (res.data.success) {
        toast.success(res.data.message),
          navigate("/verifycation-otp", {
          state: data
        })
        setData({
          email: "",
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  const fillValue = Object.values(data).every(val => val)

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4 border border-red-500">
        <p className="text-center text-3xl font font-semibold">Forgot Password</p>

        <form action="" onSubmit={handleSubmit}>

          <div className="grid gap-2 mt-6">
            <label htmlFor="email">Email</label>
            <input type="email" autoFocus name="email" id="email" className="bg-blue-50 p-2 border rounded outline-none focus-within:border-blue-500" value={data.email} onChange={handleChange} placeholder="Enter your email" />
          </div>

          <Link to={"/forgot-password"} className="hover:text-blue-500 block text-right mt-3">Forgot Password?</Link>

          <button disabled={!fillValue} className={`${fillValue ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-500"}  text-white rounded font-semibold w-full p-2 mt-3 leading-6 tracking-wide`}>
            Send OTP
          </button>
        </form>

        <p className="mt-3 text-center lg:text-left">Already have account? <Link to={"/login"} className="font-semibold text-blue-500 hover:text-blue-600">Login</Link></p>

      </div>
    </section>
  )
}

export default ForgotPassword