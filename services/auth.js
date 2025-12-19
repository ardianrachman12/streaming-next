"use client";

import Cookies from "js-cookie";
import axiosClient from "../lib/axiosClient";

export async function login(email, password) {
    const res = await axiosClient.post("/api/login", { email, password });

    const { token, user } = res.data;

    // simpan token
    localStorage.setItem("token", token);
    localStorage.setItem("name", user.name);
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("name", user.name);

    return { token, user };
}

export async function register(payload) {
    return await axiosClient.post("/api/register", payload);
}

export async function logout() {
    await axiosClient.post("/api/logout");

    localStorage.removeItem("token");
    localStorage.removeItem("name");
    Cookies.remove("token");
    Cookies.remove("name");
}

export async function getUser() {
    const res = await axiosClient.get("/api/me");
    const user = res.data;

    // kalau mau simpan
    localStorage.setItem("name", user.name);
    // Cookies.set("name", user.name);

    return user;
}

