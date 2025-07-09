import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

export default http;