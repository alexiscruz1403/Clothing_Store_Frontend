import http from "./http";
import { objectToQueryParams } from "@/utils/objectToQueryParams";

export const getFavorites = async (params) => {
    try {
        const baseUrl = "/api/favorites";
        const response = await http.get(`${baseUrl}?${objectToQueryParams(params)}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addFavorite = async (productId) => {
    try {
        const response = await http.post("/api/favorites/add", { product_id: productId });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeFavorite = async (productId) => {
    try {
        const response = await http.delete(`/api/favorites/delete/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}