import { reactive, ref, watch } from "vue";
import { defineStore } from "pinia";
import { getProducts } from "@/api/products";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { storeToRefs } from "pinia";

const filtersStore = useFiltersStore();
const { genreFilter, categoryFilter, searchFilter } = storeToRefs(filtersStore);

export const useProductsStore = defineStore("products", () => {
    const products = ref([]);

    const params = reactive({
        page: 1,
        product_genre: genreFilter,
        product_categories: categoryFilter,
        search: searchFilter
    });

    const matches = ref(0);

    const availableProducts = ref(true);

    const fetchProducts = async () => { 
        try {
            const response = await getProducts(params);

            if(products.value.length == 0) {
                products.value = response.data.products;
            }else{
                products.value.push(...response.data.products);
            }

            matches.value = response.data.meta.total;

            if(response.data.links.next){
                params.page++;
                availableProducts.value = true;
            }else{
                availableProducts.value = false;
            };
        }catch(error){
            throw error;
        }
    }

    const clearProducts = () => {
        products.value = [];
        params.page = 1;
        matches.value = 0;
        availableProducts.value = false;
    }

    return{
        products,
        matches,
        availableProducts,
        params,
        fetchProducts,
        clearProducts
    }
});