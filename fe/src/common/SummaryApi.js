export const baseURL = import.meta.env.VITE_API_URL

const SummarryApi = {
    register: {
        url: "/api/user/register",
        method: "post"
    },
    login: {
        url: "/api/user/login",
        method: "post"
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: "put"
    },
    forgot_password_otp_verification: {
        url: "/api/user/verify-forgot-password-otp",
        method: "put"
    },
    reset_password: {
        url: "/api/user/reset-password",
        method: "put"
    },
    refreshToken: {
        url: "/api/user/refresh-token",
        method: "post"
    },
    user_details: {
        url: "/api/user/user-details",
        method: "get"
    },
    logout: {
        url: "/api/user/logout",
        method: "get"
    },
    uploadAvatar: {
        url: "/api/user/upload-avatar",
        method: "put"
    },
    updateUserDetails: {
        url: "/api/user/update-user",
        method: "put"
    },
    addCategory: {
        url: "/api/category/add-category",
        method: "post"
    },
    uploadImg: {
        url: "/api/file/upload",
        method: "post"
    },
    getCategory: {
        url: "/api/category/get",
        method: "get"
    },
    updateCategory: {
        url: "/api/category/update-category",
        method: "put"
    },
    deleteCategory: {
        url: "/api/category/delete",
        method: "delete"
    },
    createSubCategory: {
        url: "/api/subcategory/create",
        method: "post"
    },
    getSubCategory: {
        url: "/api/subcategory/get",
        method: "post"
    },
    updateSubCategory: {
        url: "/api/subcategory/update",
        method: "put"
    },
    deleteSubCategory: {
        url: "/api/subcategory/delete",
        method: "delete"
    },
    createProduct: {
        url: "/api/products/create",
        method: "post"
    },
    getProduct: {
        url: "/api/products/get",
        method: "post"
    },
    getProductsByCategory: {
        url: "/api/products/getProductsByCategory",
        method: "post"
    },
    getProductsByCategoryAndSubCategory: {
        url: "/api/products/getProductsByCategoryAndSubCategory",
        method: "post"
    },
    getProductsDetails: {
        url: "/api/products/getProductsDetails",
        method: "post"
    },
    updateProducts: {
        url: "/api/products/updateProducts",
        method: "put"
    },
    deleteProducts: {
        url: "/api/products/deleteProducts",
        method: "delete"
    },
    searchProducts: {
        url: "/api/products/searchProducts",
        method: "post"
    },
    addToCart: {
        url: "/api/cart/create",
        method: "post"
    },
    getCartItem: {
        url: "/api/cart/get",
        method: "get"
    },
    updateCartItem: {
        url: "/api/cart/update",
        method: "put"
    },
    deleteCartItem: {
        url: "/api/cart/delete",
        method: "delete"
    },
    createAddress: {
        url: "/api/address/create",
        method: "post"
    },
    getAddress: {
        url: "/api/address/get",
        method: "get"
    },
    updateAddress: {
        url: "/api/address/update",
        method: "put"
    },
    disableAddress: {
        url: "/api/address/delete",
        method: "delete"
    },
    CashOnDelivery: {
        url: "/api/order/cash-on-delivery",
        method: "post"
    },
    PaymentUrl: {
        url: "/api/order/checkout",
        method: "post"
    },
    webhook: {
        url: "/api/order/webhook",
        method: "post"
    },
    getOrderDetails: {
        url: "/api/order/order-list",
        method: "get"
    }
}

export default SummarryApi;
