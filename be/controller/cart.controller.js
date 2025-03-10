import AxiosToastError from "../../fe/src/utils/AxiosToastError.js";
import cartProductModel from "../model/cartProduct.model.js";
import UserModel from "../model/user.model.js";

export const addToCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        const { productID } = req.body;
        // Kiểm tra productID
        if (!productID) {
            return res.status(402).json({
                message: "Provide product Id",
                error: true,
                success: false
            });
        }
        // Log thông tin để kiểm tra
        console.log("User ID:", userId);
        console.log("Product ID:", productID);
        const checkItemCart = await cartProductModel.findOne({
            userId: userId,
            productId: productID,
        });
        // Log kết quả kiểm tra
        console.log("Check Item Cart:", checkItemCart);
        if (checkItemCart) {
            return res.status(400).json({
                message: "items already in cart"
            });
        }

        const cartItem = new cartProductModel({
            quantity: 1,
            userId: userId,
            productId: productID
        });

        const save = await cartItem.save();
        const updateCartUser = await UserModel.updateOne({ _id: userId }, {
            $push: {
                shopping_cart: productID
            }
        });

        return res.json({
            data: save,
            message: "item add successfully",
            error: false,
            success: true
        });

    } catch (error) {
        console.error("Error occurred:", error); // Log lỗi
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

export const getCartItemController = async (req, res) => {
    try {
        const userId = req.userId

        const cartItem = await cartProductModel.find({
            userId: userId,
        }).populate('productId')

        return res.json({
            data: cartItem,
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

export const updateCartItemQtyController = async (req, res) => {
    try {
        const userId = req.userId
        const { _id, qty } = req.body

        if (!_id || !qty) {
            return res.status(400).json({
                message: "Provide Id, qty",
            })
        }

        const updateCartItem = await cartProductModel.updateOne({ _id: _id, userId: userId }, {
            quantity: qty
        })

        return res.json({
            message: "Update Cart",
            error: false,
            success: true,
            data: updateCartItem
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const deleteCartItemQtyController = async (req, res) => {
    try {
        const userid = req.userId // middleware
        const { _id } = req.body

        if (!_id) {
            return res.status(400).json({
                message: "provide _id",
                error: true,
                success: false,
            })
        }

        const deleteCartItem = await cartProductModel.deleteOne({ _id: _id, userId: userid })

        return res.json({
            message: "Item Remove",
            error: false,
            success: true,
            data: deleteCartItem
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}