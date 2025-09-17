import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use(
    (config) => {
        const token = Cookie.get("_my_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            (originalRequest.url.includes("/login") || originalRequest.url.includes("/register"))
        ) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            Cookie.remove("_my_token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;
