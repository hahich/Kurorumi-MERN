import addressModel from "../model/address.model.js";
import UserModel from "../model/user.model.js";

export const addAddressController = async (req, res) => {
    try {
        const userId = req.userId
        const { address_line, city, state, pincode, country, mobile } = req.body

        const createAddress = new addressModel({
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
            userId: userId,
        })

        const saveAddress = await createAddress.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
            $push: {
                address_detail: saveAddress._id
            }
        })

        return res.json({
            message: "Address create successfully",
            data: saveAddress,
            error: false,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const getAddressController = async (req, res) => {
    try {
        const userId = req.userId //middleware

        const data = await addressModel.find({ userId: userId }).sort({ createdAt: -1 })

        return res.json({
            message: "List of address",
            data: data,
            error: false,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const updateAddressController = async (req, res) => {
    try {
        const userId = req.userId //middleware
        const { _id, address_line, city, state, country, pincode, mobile } = req.body

        const updateAddress = await addressModel.updateOne({ _id: _id, userId: userId }, {
            address_line,
            city,
            state,
            country,
            pincode,
            mobile,
        })

        return res.json({
            message: "Update successfully",
            data: updateAddress,
            error: false,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const deleteAddressController = async (req, res) => {
    try {
        const userId = req.userId
        const { _id } = req.body

        const disableAddress = await addressModel.updateOne({ _id: _id, userId }, {
            status: false
        })

        return res.json({
            message: "Address remove",
            data: disableAddress,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}