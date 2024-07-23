import axios from "axios";
import {BASE_URL} from "./constants.js";

export const axiosUserInstance = axios.create({
    baseURL: `${BASE_URL}api/users`,
    timeout: 10000,
    headers: {
        "Content-type": "application/json"
    }
});

axiosUserInstance.interceptors.request.use((config) => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

// ===================================================================

export const axiosNoteInstance = axios.create({
    baseURL: `${BASE_URL}api/note`,
    timeout: 10000,
    headers: {
        "Content-type": "application/json"
    }
});

axiosNoteInstance.interceptors.request.use((config) => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    });