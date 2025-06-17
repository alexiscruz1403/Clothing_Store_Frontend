import { ref } from "vue";
import { defineStore } from "pinia";

export const useDetailStore = defineStore('detail', () => {
    const product = ref(null);

    const relatedProducts = ref([]);

    const fetchProduct = async (id) => {
        const newProduct = {
            product_id: parseInt(id),
            product_images: [{image_id:1, image_path: '/home/leonardo-zapatillas.png', is_main: true}, {image_id:2, image_path: '/home/leonardo-zapatillas.png', is_main: false}, {image_id:3, image_path: '/home/leonardo-zapatillas.png', is_main: false}],
            product_name: 'Sample Product',
            product_brand: 'Sample Brand',
            product_description: 'This is a sample product description.',
            product_price: 29.99,
            product_sizes: [{
                size: 'S',
                stock: 10
            }, {
                size: 'M',
                stock: 5
            }, {
                size: 'L',
                stock: 0
            }],
            product_is_in_favorites: false
        };

        const newRelatedProducts = [
            { product_id: 1, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 1', product_price: 19.99},
            { product_id: 2, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 2', product_price: 24.99},
            { product_id: 3, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 3', product_price: 34.99},
            { product_id: 4, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 4', product_price: 44.99},
            { product_id: 5, product_image: '/home/leonardo-zapatillas.png', product_name: 'Related Product 5', product_price: 54.99}
        ];

        product.value = newProduct;
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