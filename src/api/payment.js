import http from "./http";

export const createPaymentPreference = async (products) => {
    try {
        const response = await http.post('/payment', {
            products
        });
        return response.data.data.data;
    } catch (error) {
        throw error;
    }
}

export const getOrderNumber = async () => {
    try {
        const response = await http.get('/payment/success');
        return response.data;
    }catch(error){
        throw error;
    }
}

export const restoreCart = async () => {
    try {
        const response = await http.get('/payment/failure');
        return response.data;
    } catch (error) {
        throw error;
    }
}