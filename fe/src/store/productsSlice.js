import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    allCategory: [],
    loadingCategory: false,
    allSubCategory: [],
    products: []
}

const productsSlice = createSlice({
    name: "products",
    initialState: initialValue,
    reducers: {
        setAllCategory: (state, action) => {
            state.allCategory = [...action.payload]
        },
        setLoadingCategory: (state, action) => {
            state.loadingCategory = action.payload
        },
        setAllSubCategory: (state, action) => {
            state.allSubCategory = [...action.payload]
        },
    }
})

export const { setAllCategory, setAllSubCategory, setLoadingCategory } = productsSlice.actions

export default productsSlice.reducer