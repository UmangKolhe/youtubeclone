import { createSlice } from "@reduxjs/toolkit";

const aapSlice =createSlice({
        name:"aap",
        initialState:{
            isMenuOpen:false
        },
        reducers:{
            toggleMenu:(state)=>{
                state.isMenuOpen=!state.isMenuOpen;
            }
        }
})

export const {toggleMenu}=aapSlice.actions;
export default aapSlice.reducer;