
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    categorias: []
};

const categoriaSlice = createSlice({
    name: "categorias",
    initialState,
    reducers: {
        setCategorias: (state, action) => {
            state.categorias = action.payload;
        }
    }
});

export const {setCategorias} = categoriaSlice.actions;
export default categoriaSlice.reducer;