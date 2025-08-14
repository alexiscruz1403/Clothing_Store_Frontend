import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getCart, addProductToCart, updateProductQuantity, removeProductFromCart, clearCartProducts } from '@/api/cart';
import { useAuthStore } from './useAuthStore';
import { storeToRefs } from 'pinia';
import http from '@/api/http';

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([]);

    const fallbackItems = ref([]);

    const fetchCart = async () => {
        try{
            const response = await getCart();
            const newCart = response.data.cart;
            cartItems.value = newCart;
        }catch(error){

        }
    }

    const addProduct = async (productId, productSize, productQuantity) => {
        try{
            await addProductToCart(productId, productSize, productQuantity);
            authStore.updateUser({cart: user.value.cart + 1});
        }catch(error){

        }
    };

    const changeProductQuantity = (productId, productSize, newQuantity) => {
        const currentProducts = cartItems.value;
        const currentFallbackProducts = fallbackItems.value;

        currentProducts.map((product) => {
            if(product.product_id === productId && product.stock.product_size === productSize){
                if(!fallbackItems.value.some(item => item.product_id === productId && item.product_size === productSize)) currentFallbackProducts.push({
                    product_id: product.product_id,
                    product_size: product.stock.product_size,
                    product_quantity: product.product_quantity
                });

                product.product_quantity = newQuantity;
            }

            return product;
        })
        cartItems.value = currentProducts;
        fallbackItems.value = currentFallbackProducts;
    }

    const updateCartItems = async (productId, productSize, newQuantity) => {
        const currentFallbackProducts = fallbackItems.value;
        try{
            await updateProductQuantity(productId, productSize, newQuantity);

            if(fallbackItems.value.some(item => item.product_id === productId && item.product_size === productSize)) currentFallbackProducts = fallbackItems.value.filter(item => !(item.product_id === productId && item.product_size === productSize));

            fallbackItems.value = currentFallbackProducts;
        }catch(error){

        }
    };

    const removeProduct = async (productId, productSize) => {
        const product = cartItems.value.find(item => item.product_id === productId && item.stock.product_size === productSize);

        cartItems.value = cartItems.value.filter(item => !(item.product_id === productId && item.stock.product_size === productSize));

        authStore.updateUser({cart: user.value.cart - 1});

        try{
            await removeProductFromCart(productId, productSize);
        }catch(error){
            cartItems.value.push(product);
        }
    }

    const clearCart = async () => {
        cartItems.value = [];
        try{
            await clearCartProducts();
            authStore.updateUser({ cart: 0 });
        }catch(error){
            console.error("Error clearing cart:", error);
        }
    }
    
    return { 
        cartItems, 
        fetchCart,
        addProduct,
        changeProductQuantity,
        updateCartItems, 
        removeProduct,
        clearCart
    };
})