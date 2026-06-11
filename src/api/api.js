import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/v1",
});
//https://ugc-e-sports.vercel.app/v1
//http://localhost:3000/v1
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;