import { configureStore } from "@reduxjs/toolkit";
import NotesDataSlice from "./NotesDataSlice";
export default configureStore({
    reducer:{
        notesData:NotesDataSlice
    }
})