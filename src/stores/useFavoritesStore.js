import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useFiltersStore } from './useFiltersStore';
import { useProductsStore } from './useProductsStore';
import { getFavorites, addFavorite, removeFavorite } from '@/api/favorites';
import { storeToRefs } from 'pinia';

const filtersStore = useFiltersStore();
const { genreFilter, categoryFilter, searchFilter } = storeToRefs(filtersStore);

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

const timeout = ref(null);

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref([]);

    const params = reactive({
        page: 1,
        product_genre: genreFilter,
        product_categories: categoryFilter,
        search: searchFilter
    });

    const matches = ref(0);

    const availableFavorites = ref(false);

    const fetchFavorites = async () => {
        try{ 
            const response = await getFavorites(params);

            if(favorites.value.length == 0) {
                favorites.value = response.data.products;
            } else {
                favorites.value.push(...response.data.products);
            }

            matches.value = response.data.meta.total;

            if(response.data.links.next){
                params.page++;
                availableFavorites.value = true;
            }else{
                availableFavorites.value = false;
            };
        }catch(error){
            throw error;
        }
    }

    const toggleFavorite = async (product) => {
        const newProducts = products.value;
        const productsIndex = products.value.findIndex((fav) => fav.product_id === product.product_id);
        const favoritesIndex = favorites.value.findIndex((fav) => fav.product_id === product.product_id);

        if(productsIndex !== -1){
            newProducts[productsIndex].is_in_favorites = !newProducts[productsIndex].is_in_favorites;
            products.value = newProducts;
        } 

        if(favoritesIndex !== -1){
            const newFavorites = favorites.value.filter((fav) => fav.product_id !== product.product_id);
            favorites.value = newFavorites;
        }

        if(timeout.value) clearTimeout(timeout.value);

        timeout.value = setTimeout(async () => {
            try{
                if(product.is_in_favorites) {
                    await removeFavorite(product.product_id);
                } else {
                    await addFavorite(product.product_id);
                }
            }catch(error){
                if(!error.response.data.errors.operation && !error.response.data.errors.record) {
                    if(productsIndex !== -1){
                        newProducts[productsIndex].is_in_favorites = false;
                        products.value = newProducts;
                    }

                    if(favoritesIndex !== -1){
                        favorites.value.push(product);
                    }
                };
            }
        }, 1000);
    };

    const clearFavorites = () => {
        favorites.value = [];
        params.page = 1;
        matches.value = 0;
        availableFavorites.value = false;
    }

    return {
        favorites,
        matches,
        availableFavorites,
        fetchFavorites,
        toggleFavorite,
        clearFavorites,
    };
});