import mongoose from "mongoose"
import orderModel from "../model/order.model.js"
import UserModel from "../model/user.model.js"
import cartProductModel from "../model/cartProduct.model.js"
import stripe from "../config/stripe.js"

export const CashOnDeliveryController = async (req, res) => {
    try {
        const userId = req.userId //auth middlware
        const { list_items, totalAmt, addressId, subTotalAmt } = req.body

        const payload = list_items.map(el => {
            return ({
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: el.productId._id,
                product_detail: {
                    name: el.productId.name,
                    image: el.productId.image,
                },
                paymentId: "",
                payment_status: "Cash On Delivery",
                delevery_address: addressId,
                subTotalAmt: subTotalAmt,
                totalAmt: totalAmt,
            })
        })

        const generateOder = await orderModel.insertMany(payload)

        //remove from cart
        const removeCartItems = await cartProductModel.deleteMany({ userId: userId })
        const updateInUser = await UserModel.updateOne({ _id: userId }, {
            shopping_cart: []
        })

        return res.json({
            message: "Order Successfully",
            data: generateOder,
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

export const priceWithDiscount = (price, discount = 1) => {
    const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100)
    const actualPrice = Number(price) - Number(discountAmount)
    return actualPrice
}

export const paymentController = async (req, res) => {
    try {
        const userId = req.userId //middleware
        const { list_items, totalAmt, addressId, subTotalAmt } = req.body
        const user = await UserModel.findById(userId)

        const line_items = list_items.map(items => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: items.productId.name,
                        images: items.productId.image,
                        metadata: {
                            productId: items.productId._id,
                        }
                    },
                    unit_amount: priceWithDiscount(items.productId.price, items.productId.discount)
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                },
                quantity: items.quantity
            }
        })

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ['card'],
            customer_email: user.email,
            metadata: {
                userId: userId,
                addressId: addressId,
            },
            line_items: line_items,
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await Stripe.checkout.sessions.create(params);

        return res.status(200).json(session)

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const getOrderProductItems = async ({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status }) => {
    const productList = []

    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await Stripe.products.retrieve(item.price.product)

            const payload = {
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: product.metadata.productId,
                product_detail: {
                    name: product.name,
                    image: product.images,
                },
                paymentId: paymentId,
                payment_status: payment_status,
                delevery_address: addressId,
                subTotalAmt: Number(item.amount_total / 100),
                totalAmt: Number(item.amount_total / 100),
            }

            productList.push(payload)
            console.log("product", product);
        }

    }

    return productList
}

//http://localhost:8080/api/order/webhook
export const webhookStripe = async (req, res) => {
    const event = req.body;
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Thực hiện các hành động cần thiết khi phiên thanh toán hoàn tất
            const lineItems = await Stripe.checkout.sessions.listLineItems(session.id);
            const userId = session.metadata.userId;
            // Giả sử bạn có một hàm để lưu đơn hàng
            const orderProduct = await getOrderProductItems({
                lineItems: lineItems,
                userId: userId,
                addressId: session.metadata.addressId,
                paymentId: session.payment_intent,
                payment_status: session.payment_status
            });
            // Lưu đơn hàng vào cơ sở dữ liệu
            const order = await orderModel.insertMany(orderProduct);
            console.log("order", order);

            if (order.length > 0) {
                // Xóa sản phẩm trong giỏ hàng
                await UserModel.findByIdAndUpdate(userId, {
                    shopping_cart: []
                });
                await cartProductModel.deleteMany({ userId: userId });
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Trả về phản hồi để xác nhận đã nhận sự kiện
    res.json({ received: true });
}

export const getOrderDetailsController = async (req, res) => {
    try {
        const userId = req.userId
        const orderList = await orderModel.find({ userId: userId }).sort({ createdAt: -1 }).populate('delevery_address')

        return res.json({
            message: "order list",
            data: orderList,
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