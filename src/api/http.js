import axios from "axios";

const http = axios.create({
    baseURL: "https://clothingstorebackend-production-8f6e.up.railway.app",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

export default http;