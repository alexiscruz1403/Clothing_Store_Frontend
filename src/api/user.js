import http from "./http";

export const updateUserInfo = async (user) => {
    try{
        const response = await http.put('/my/profile', user);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updateUserPassword = async (password) => {
    try{
        const response = await http.put('/my/password', password);
        return response.data;
    }catch(error){
        throw error;
    }
}