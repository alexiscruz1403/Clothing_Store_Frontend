import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useFiltersStore } from "./useFiltersStore";

const filtersStore = useFiltersStore();

const { filters } = storeToRefs(filtersStore);

export const useProductsStore = defineStore("products", () => {
    const products = ref([]);

    const getProducts = async () => {
        const { category, genre, search } = filters.value;
        const newProducts = [
            {
                product_id: 1,
                product_name: 'Camiseta Básica',
                product_brand: 'Marca A',
                product_description: 'Descripcion de la camiseta básica de Marca A.',
                product_price: 19.99,
                product_image: "/home/ideogram-remeras.png",
                product_is_in_cart: false,
                product_is_in_favorites: false,   
            },
            {
                product_id: 2,
                product_name: 'Pantalón Casual',
                product_brand: 'Marca B',
                product_description: 'Descripcion del pantalón casual de Marca B.',
                product_price: 39.99,
                product_image: "/home/leonardo-pantalones.png",
                product_is_in_cart: false,
                product_is_in_favorites: true,
            },
            {
                product_id: 3,
                product_name: 'Zapatillas Deportivas',
                product_brand: 'Marca C',
                product_description: 'Descripcion de las zapatillas deportivas de Marca C.',
                product_price: 59.99,
                product_image: "/home/leonardo-zapatillas.png",
                product_is_in_cart: true,
                product_is_in_favorites: false,
            },
            {
                product_id: 1,
                product_name: 'Camiseta Básica',
                product_brand: 'Marca A',
                product_description: 'Descripcion de la camiseta básica de Marca A.',
                product_price: 19.99,
                product_image: "/home/ideogram-remeras.png",
                product_is_in_cart: false,
                product_is_in_favorites: false,   
            },
            {
                product_id: 2,
                product_name: 'Pantalón Casual',
                product_brand: 'Marca B',
                product_description: 'Descripcion del pantalón casual de Marca B.',
                product_price: 39.99,
                product_image: "/home/leonardo-pantalones.png",
                product_is_in_cart: false,
                product_is_in_favorites: true,
            },
            {
                product_id: 3,
                product_name: 'Zapatillas Deportivas',
                product_brand: 'Marca C',
                product_description: 'Descripcion de las zapatillas deportivas de Marca C.',
                product_price: 59.99,
                product_image: "/home/leonardo-zapatillas.png",
                product_is_in_cart: true,
                product_is_in_favorites: false,
            }
        ];

        products.value = newProducts;
        return newProducts;
    }

    return{
        products,
        getProducts
    }
});