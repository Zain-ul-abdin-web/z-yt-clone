import { configureStore } from "@reduxjs/toolkit";
import { youtubeClone } from "./redux/feature/services";
import youtubeSlice from "./redux/youtubeSlice";
export const store = configureStore({
    reducer:{
        youtubeSlice,
        [youtubeClone.reducerPath] : youtubeClone.reducer,
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(youtubeClone.middleware)
});