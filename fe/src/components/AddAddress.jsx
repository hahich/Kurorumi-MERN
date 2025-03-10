import React from 'react'
import { useForm } from "react-hook-form"
import { IoClose } from 'react-icons/io5'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummarryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider'

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset } = useForm()
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {
        try {
            const res = await Axios({
                ...SummarryApi.createAddress,
                data: {
                    address_line: data.addressline,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode,
                    mobile: data.mobile,
                }
            })

            const { data: responseData } = res

            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close(),
                        reset(),
                        fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 flex items-center justify-center z-50 p-4'>
            <div className="bg-white max-w-2xl w-full p-4 rounded ">
                <div className="flex justify-between items-center">
                    <h2 className='font-semibold'>Add Address</h2>
                    <IoClose onClick={close} className='cursor-pointer hover:text-red-500' size={25} />
                </div>

                <form action="" className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-1">
                        <label htmlFor="addressline">Address Line: </label>
                        <input type="text"
                            id='addressline'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("addressline", { required: true })}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="pincode">City: </label>
                        <input type="text"
                            id='pincode'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("pincode", { required: true })}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="state">State: </label>
                        <input type="text"
                            id='state'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("state", { required: true })}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="city">Pincode: </label>
                        <input type="text"
                            id='city'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("city", { required: true })}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="country">Country: </label>
                        <input type="text"
                            id='country'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("country", { required: true })}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="mobile">Mobile Number: </label>
                        <input type="text"
                            id='mobile'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("mobile", { required: true })}
                        />
                    </div>

                    <button className='bg-white border transition duration-300 border-blue-500 text-blue-500 p-2 mt-4 w-full rounded font-semibold hover:bg-blue-500 hover:text-white' type='submit'>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default AddAddress
