import { useState } from "react"
import { useSelector } from "react-redux"
import AddAddress from "../components/AddAddress"
import { MdDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../utils/Axios";
import SummarryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async (id) => {
    try {
      const res = await Axios({
        ...SummarryApi.disableAddress,
        data: {
          _id: id
        }
      })

      if (res.data.success) {
        toast.success("Address Remove")
        if (fetchAddress) {
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className="p-4">
      <div className="bg-white shadow p-2 flex justify-between gap-4 items-center">
        <h2 className="font-semibold text-ellipsis line-clamp-1">Address</h2>
        <button onClick={() => setOpenAddress(true)} className="border border-blue-500 text-blue-500 px-2 py-1 rounded-full hover:bg-blue-500 hover:text-white">
          Add Address
        </button>
      </div>

      <div className="grid gap-4 p-2 border border-blue-500 rounded">
        <div className="grid gap-2">
          {
            addressList.map((address, index) => {
              return (
                <div key={address._id || index} className={`border rounded p-3 border-blue-500 flex justify-between gap-3 ${!address.status && "hidden"}`}>
                  <div className="">
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.country} - {address.pincode}</p>
                    <p>{address.mobile}</p>
                  </div>

                  <div className="px-2 grid gap-10">
                    <button onClick={() => handleDisableAddress(address._id)} className="bg-white p-1 lg:p-2 transition duration-300 hover:bg-red-500 hover:text-white border border-red-500 rounded text-red-500">
                      <MdDeleteOutline size={20} />
                    </button>

                    <button onClick={() => { setEditData(address), setOpenEdit(true) }} className="bg-white p-1 lg:p-2 transition duration-300 hover:bg-blue-500 hover:text-white border border-blue-500 rounded text-blue-500">
                      <LuPencil size={20} />
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div onClick={() => setOpenAddress(true)} className="cursor-pointer h-24 bg-blue-50 border-2 border-dashed rounded flex justify-center items-center">
          Add address
        </div>
      </div>

      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEdit && (
          <EditAddressDetails close={() => setOpenEdit(false)} data={editData} />
        )
      }
    </div>
  )
}

export default Address