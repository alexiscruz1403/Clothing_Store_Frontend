import http from "./http";

export const getCart = async () => {
    try {
        const response = await http.get('/api/cart');
        return response.data;
    }catch(error){
        throw error;
    }
}

export const addProductToCart = async (productId, productSize, productQuantity) => {
    try {
        const response = await http.post('/api/cart/add', { product_id: productId, product_size: productSize, product_quantity: productQuantity });
        return response.data;
    }catch(error){
        throw error;
    }
}

export const updateProductQuantity = async (productId, productSize, productQuantity) => {
    try {
        const response = await http.put('/api/cart/update', { product_id: productId, product_size: productSize, product_quantity: productQuantity });
        return response.data;
    }catch(error){
        throw error;
    }
}

export const removeProductFromCart = async (productId, productSize) => {
    try {
        const response = await http.delete(`/api/cart/delete/${productId}/${productSize}`);
        return response.data;
    }catch(error){
        throw error;
    }
}