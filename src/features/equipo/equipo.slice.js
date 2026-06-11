import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    equipos: []
};

const equipoSlice = createSlice({
    name: "equipos",
    initialState,
    reducers: {
        setEquipos: (state, action) => {
            state.equipos = action.payload;
        }
    }
});

export const { setEquipos } = equipoSlice.actions;

export default equipoSlice.reducer;