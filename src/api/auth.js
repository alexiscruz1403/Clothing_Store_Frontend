import http from "./http"

export const register = async (userData) => {
    try {
        const response = await http.post("/auth/register", userData);
        sessionStorage.setItem("token", response.data.data.token);
        return response.data.data;
    }catch(error){
        throw error;
    }
}

export const login = async (userData) => {
    try {
        const response = await http.post("/auth/login", userData);
        sessionStorage.setItem("token", response.data.data.token);
        return response.data.data;
    }catch(error){
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await http.post("/auth/logout");
        sessionStorage.removeItem("token");
    }catch(error){
        throw error;
    }
}

export const validate = async () => {
    try {
        const response = await http.get("/auth/user");
        return response.data;
    }catch(error){
        sessionStorage.removeItem("token");
        throw error;
    }
}

