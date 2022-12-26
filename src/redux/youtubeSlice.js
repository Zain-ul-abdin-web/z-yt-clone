import { createSlice } from "@reduxjs/toolkit";
const YoutubeState = {
    toggleNavbar: {
        barShow: true
    }
}
const youtubeSlice = createSlice({
    name: "youtubeSlice",
    initialState: YoutubeState,
    reducers:{
        toggleNavbar: (state,{payload})=>{
            if(payload){
                state.toggleNavbar.bar = payload
            } else{
                state.toggleNavbar.barShow = !state.toggleNavbar.barShow;
            }
        }
    }
});
export const {toggleNavbar} = youtubeSlice.actions;
export default youtubeSlice.reducer;