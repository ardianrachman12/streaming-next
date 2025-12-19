// lib/axiosClient.js

import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// INTERCEPTOR: Menambahkan Bearer Token ke setiap permintaan
axiosClient.interceptors.request.use(config => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosClient;