import { createSlice } from "@reduxjs/toolkit";

export const ShopDetailsSlice = createSlice({
    name: "ShopDetails",
    initialState: {
        ShopDetails: {},
    },
    reducers: {
        setShopDetails: (state, action) => {
            state.ShopDetails = action.payload;
        }
    }
});
export const { setShopDetails } = ShopDetailsSlice.actions;
export default ShopDetailsSlice.reducer;