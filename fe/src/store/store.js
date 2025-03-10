import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productsReducer from './productsSlice'
import cartReducer from './cartProductsCart'
import addressReducer from "./addressSlice"
import orderReducer from "./orderSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cartItem: cartReducer,
    addresses: addressReducer,
    orders: orderReducer,
  },
})