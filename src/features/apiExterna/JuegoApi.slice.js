import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    juegos: []
};

const juegoSlice = createSlice({
    name: "juegosApi",
    initialState,
    reducers: {
        setJuegosApi: (state, action) => {
            state.juegos = action.payload;
        }
    }
});

export const { setJuegosApi } = juegoSlice.actions;

export default juegoSlice.reducer;