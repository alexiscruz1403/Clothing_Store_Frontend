import http from "./http";
import httpWithFile from "./httpWithFIle";

export const validateAdmin = async () => {
    try{
        const response = await http.get('/admin');
        return response.data;
    }catch(error){
        throw error;
    }
}

export const fetchAdminDataWithParams = async (table, params = null) => {
    let url = `/admin/${table}`;

    if(params){
        if(params.url) url = params.url.replace('https://clothingstorebackend-production-8f6e.up.railway.app/api', '');
        if(params.page) url += `?page=${params.page}`;
    }

    try{
        const response = await http.get(url);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const createUser = async (user) => {
    try{
        const response = await httpWithFile.post(`/admin/users`, user);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updateUser = async (user) => {
    try{
        const userId = Object.fromEntries(user).user_id;
        const response = await httpWithFile.post(`/admin/users/${userId}`, user);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteUser = async (id) => {
    try{
        const response = await http.delete(`/admin/users/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const createProduct = async (product) => {
    try{
        const response = await httpWithFile.post(`/admin/products`, product);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updateProduct = async (product) => {
    try{
        const productId = Object.fromEntries(product).product_id;
        const response = await httpWithFile.post(`/admin/products/${productId}`, product);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try{
        const response = await http.delete(`/admin/products/${id}`);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updateOrder = async (order) => {
    try{
        const orderId = Object.fromEntries(order).order_id;
        const response = await httpWithFile.post(`/admin/orders/${orderId}`, order);
        return response.data;
    }catch(error){
        throw error;
    }
}

export const cancelOrder = async (id) => {
    try{
        const response = await httpWithFile.put(`/admin/orders/${id}/cancel`);
        return response.data;
    }catch(error){
        throw error;
    }
}
