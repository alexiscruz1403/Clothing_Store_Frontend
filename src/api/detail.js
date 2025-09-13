import http from "./http";

export const getProductDetails = async (productId) => {
    try {
        const response = await http.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}