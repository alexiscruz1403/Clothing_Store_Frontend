import axios from "axios";

const httpWithFile = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    withXSRFToken: true,
});

export default httpWithFile;