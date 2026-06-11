import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatIA: []
};

const geminiSlice = createSlice({
    name: "gemini",
    initialState,
    reducers: {
        setChatGemini: (state, action) => {
            state.chatIA = action.payload;
        }
    }
});

export const { setChatGemini } = geminiSlice.actions;
export default geminiSlice.reducer;