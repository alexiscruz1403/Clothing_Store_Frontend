import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([]);

    const shippingCost = ref(20);

    const fetchCart = async () => {
        const newCart = [
            {
                product_id: 2,
                product_name: 'Pantalón Casual',
                product_brand: 'Marca B',
                product_price: 39.99,
                product_image: "/home/leonardo-pantalones.png",
                product_size: 'L',
                product_quantity: 2,
                product_stock: 10
            },
            {
                product_id: 6,
                product_name: 'Zapatillas Deportivas',
                product_brand: 'Marca C',
                product_price: 59.99,
                product_image: "/home/leonardo-zapatillas.png",
                product_size: 'M',
                product_quantity: 1,
                product_stock: 5
            }
        ];
        cartItems.value = newCart;
    }

    const changeProductQuantity = (productId, newQuantity) => {
        const currentProducts = cartItems.value;
        currentProducts.map((product) => {
            if (product.product_id === productId) {
                product.product_quantity = newQuantity;
            }
            return product;
        })
        cartItems.value = currentProducts;
    }

    const removeProductFromCart = (productId) => {
        cartItems.value = cartItems.value.filter(item => item.product_id !== productId);
    }
    
    return { cartItems, shippingCost, fetchCart, changeProductQuantity, removeProductFromCart };
})