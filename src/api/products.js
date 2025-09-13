import http from "./http";
import { objectToQueryParams } from "@/utils/objectToQueryParams";

export const getProducts = async (params) => {
    try {
        const baseUrl = "/products";
        const response = await http.get(`${baseUrl}?${objectToQueryParams(params)}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}