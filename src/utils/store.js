import { configureStore } from "@reduxjs/toolkit";
import aapSlice from "./aapSlice"
import searchSlice from "./searchSlice"
import chatSlice from "./chatSlice"

const store = configureStore({
    reducer:{
        app:aapSlice,
        search:searchSlice,
        chat:chatSlice,
    }
})

export default store