import { ref } from "vue";
import { defineStore } from "pinia";
import { getProductDetails } from "@/api/detail";

export const useDetailStore = defineStore('detail', () => {
    const product = ref(null);

    const relatedProducts = ref([]);

    const fetchProduct = async (id) => {
        try{
            const response = await getProductDetails(id);
            product.value = response.data;
        }catch(error){
            product.value = null;
        }
        const newRelatedProducts = [
            { product_id: 1, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 1', product_brand: 'Marca ejemplo', product_price: 19.99},
            { product_id: 2, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 2', product_brand: 'Marca ejemplo', product_price: 24.99},
            { product_id: 3, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 3', product_brand: 'Marca ejemplo', product_price: 34.99},
            { product_id: 4, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 4', product_brand: 'Marca ejemplo', product_price: 44.99},
            { product_id: 5, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 5', product_brand: 'Marca ejemplo', product_price: 54.99}
        ];

        relatedProducts.value = newRelatedProducts;
    }

    const changeProductFavoriteState = () => {
        if(product.value){
            const newProduct = { ...product.value, product_is_in_favorites: !product.value.product_is_in_favorites};
            product.value = newProduct;
        }
    }

    return {
        product,
        relatedProducts,
        fetchProduct,
        changeProductFavoriteState
    };
})