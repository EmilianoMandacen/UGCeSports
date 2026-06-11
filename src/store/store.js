import { configureStore } from "@reduxjs/toolkit";

import torneosReducer from "../features/torneos/torneos.slice";
import juegosReducer from "../features/juegos/juego.slice";
import categoriaReducer from "../features/categoria/categoria.slice";
import equipoReducer from "../features/equipo/equipo.slice";
import juegosApiReducer from "../features/apiExterna/JuegoApi.slice.js";
import geminiReducer from "../features/gemini/gemini.slice";
import planReducer from "../features/plan/plan.slice";

export const store = configureStore({
    reducer: {
        torneos: torneosReducer,
        juegos: juegosReducer,
        categorias: categoriaReducer,
        equipos: equipoReducer,
        juegosApi: juegosApiReducer,
        gemini: geminiReducer,
        planes: planReducer
    }
});