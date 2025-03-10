import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cartItem",
    initialState: initialState,
    reducers: {
        handleAddItemsCart: (state, action) => {
            state.cart = [...action.payload]
        },
    }
})

export const { handleAddItemsCart } = cartSlice.actions
export default cartSlice.reducer