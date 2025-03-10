import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerifycation = () => {
    const [data, setData] = useState(["", "", "", "", "", ""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation();

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await Axios({
                ...SummarryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                },
            })

            if (res.data.error) {
                toast.error(res.data.message)
            }

            if (res.data.success) {
                toast.success(res.data.message)
                setData(["", "", "", "", "", ""])
                navigate("/reset-password", {
                    state: {
                        data: res.data,
                        email: location?.state?.email
                    }
                })
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    const fillValue = data.every(val => val)

    return (
        <section className="container w-full mx-auto px-2">
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4 border border-red-500">
                <p className="text-center text-3xl font font-semibold">Enter OTP</p>

                <form action="" onSubmit={handleSubmit}>

                    <div className="grid gap-2 mt-6">
                        <label htmlFor="otp">Enter Your OTP</label>
                        <div className="flex items-center gap-2 justify-between my-3">
                            {
                                data.map((element, index) => {
                                    return (
                                        <input type="text" name="otp" id="otp" key={index}
                                            ref={(ref) => {
                                                inputRef.current[index] = ref
                                                return ref
                                            }}
                                            className="bg-blue-50 w-full p-2 border rounded outline-none focus-within:border-blue-500 text-center font-semibold"
                                            maxLength={1} value={data[index]}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)
                                                
                                                if(value && index < 5) {
                                                    inputRef.current[index + 1].focus()
                                                }
                                            }}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <button disabled={!fillValue} className={`${fillValue ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-500"}  text-white rounded font-semibold w-full p-2 mt-3 leading-6 tracking-wide`}>
                        Verify OTP
                    </button>
                </form>

                <p className="mt-3 text-center lg:text-left">Already have account? <Link to={"/login"} className="font-semibold text-blue-500 hover:text-blue-600">Login</Link></p>

            </div>
        </section>
    )
}

export default OtpVerifycation