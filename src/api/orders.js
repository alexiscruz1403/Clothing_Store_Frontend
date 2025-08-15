import http from "./http";

export const getUserOrders = async () => {
    try{
        const response = await http.get("api/my/orders");
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getOrder = async (id) => {
    try{
        const response = await http.get(`api/my/orders/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}