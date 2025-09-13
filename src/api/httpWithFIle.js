import axios from "axios";

const httpWithFile = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    withXSRFToken: true,
});

httpWithFile.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token'); 
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default httpWithFile;