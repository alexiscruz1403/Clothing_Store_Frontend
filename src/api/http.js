import axios from "axios";

const http = axios.create({
    baseURL: "https://clothingstorebackend-production-8f6e.up.railway.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token'); 
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default http;