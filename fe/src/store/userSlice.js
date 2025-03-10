import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    verify_email: "",
    last_login_date: "",
    status: "",
    address_detail: [],
    shopping_cart: [],
    oder_history: [],
    role: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.avatar = action.payload?.avatar
            state.mobile = action.payload?.mobile
            state.verify_email = action.payload?.verify_email
            state.last_login_date = action.payload?.last_login_date
            state.status = action.payload?.status
            state.address_detail = action.payload?.address_detail
            state.shopping_cart = action.payload?.shopping_cart
            state.oder_history = action.payload?.oder_history
            state.role = action.payload?.role
        },
        updateAvatar : (state, action) => {
            state.avatar = action.payload
        },

        logout: (state, action) => {
            return {...initialValue}
        },
    },
})

export const { setUserDetails, logout, updateAvatar } = userSlice.actions

export default userSlice.reducer