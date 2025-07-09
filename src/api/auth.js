import http from "./http"

export const getCSRFToken = async () => {
    try {
        return http.get('/sanctum/csrf-cookie');
    } catch (error) {
        throw error.errors;
    }
}

export const register = async (userData) => {
    try {
        await getCSRFToken();
        const response = await http.post("/api/auth/register", userData);
        return response.data.data;
    }catch(error){
        throw error;
    }
}

export const login = async (userData) => {
    try {
        await getCSRFToken();
        const response = await http.post("/api/auth/login", userData);
        return response.data.data;
    }catch(error){
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await http.post("/api/auth/logout");
    }catch(error){
        throw error;
    }
}

export const validate = async () => {
    try {
        const response = await http.get("/api/auth/user");
        return response.data;
    }catch(error){
        throw error;
    }
}

