import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    planes: []
};

const planSlice = createSlice({
    name: "planes",
    initialState,
    reducers: {
        setPlanes: (state, action) => {
            state.planes = action.payload;
        }
    }
});

export const { setPlanes } = planSlice.actions;
export default planSlice.reducer;