import { configureStore } from '@reduxjs/toolkit'
import ShopDetailsSlice from '../slices/ShopDetailsSlice'

export const store = configureStore({
    reducer: {
        shop: ShopDetailsSlice,
    },
});