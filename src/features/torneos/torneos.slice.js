    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        torneos: [],
    }

    const torneosSlice = createSlice({
        name: "torneos",
        initialState,
        reducers: {
            setTorneos: (state, action) => {
                state.torneos = action.payload
            },
        }
    })

    export const { setTorneos } = torneosSlice.actions;
    
    export default torneosSlice.reducer;