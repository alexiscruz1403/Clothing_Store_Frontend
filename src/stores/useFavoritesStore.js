import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useProductsStore } from './useProductsStore';
import { storeToRefs } from 'pinia';

const productsStore = useProductsStore();

const { products } = storeToRefs(productsStore);

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref([]);

    const fetchFavorites = async () => {
        if (favorites.value.length <= 0) {
            const newFavorites = [
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
                    product_id: 6,
                    product_name: 'Zapatillas Deportivas',
                    product_brand: 'Marca C',
                    product_description: 'Descripcion de las zapatillas deportivas de Marca C.',
                    product_price: 59.99,
                    product_image: "/home/leonardo-zapatillas.png",
                    product_is_in_cart: true,
                    product_is_in_favorites: true,
                }
            ];
            favorites.value = newFavorites;
        }
    }

    const addToFavorites = (product) => {
        const index = products.value.findIndex((fav) => fav.product_id === product.product_id);
        if(index !== -1){
            const newProducts = products.value;
            newProducts[index].product_is_in_favorites = true;
            products.value = newProducts;
        }
    }

    const removeFromFavorites = (product) => {
        const index = products.value.findIndex((fav) => fav.product_id === product.product_id);
        if(index !== -1){
            const newProducts = products.value;
            newProducts[index].product_is_in_favorites = false;
            products.value = newProducts;
        }

        const newFavorites = favorites.value.filter((fav) => fav.product_id !== product.product_id);
        favorites.value = newFavorites;
    }

    return {
        favorites,
        fetchFavorites,
        addToFavorites,
        removeFromFavorites
    };
});