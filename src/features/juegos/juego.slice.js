import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    juegos: []
};

const juegoSlice = createSlice({
    name: "juegos",
    initialState,
    reducers: {
        setJuegos: (state, action) => {
            state.juegos = action.payload;
        }
    }
});

export const { setJuegos } = juegoSlice.actions;
export default juegoSlice.reducer;