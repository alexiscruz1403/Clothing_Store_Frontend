import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuthStore } from './useAuthStore';
import { storeToRefs } from 'pinia';
import { createPaymentPreference, getOrderNumber, restoreCart } from '@/api/payment';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

export const usePaymentStore = defineStore('payment', () => {
    const paymentProducts = ref([]);

    const setPaymentProducts = (products) => {
        paymentProducts.value = products;
    };

    const createPreference = async () => {
        if(paymentProducts.value.length === 0){
            console.error("No hay items en el carrito para procesar el pago.");
            return;
        }

        try{
            const response = await createPaymentPreference(paymentProducts.value);
            user.value.cart = 0;
            return response;
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    }

    const getPaymentOrderNumber = async () => {
        try{
            const response = await getOrderNumber();
            return response.data.data;
        }catch(error){
            throw error;
        }
    }

    const restoreUserCart = async () => {
        try{
            const response = await restoreCart();
            user.value.cart = response.data.data;
        }catch(error){
            throw error;
        }
    }

    return {
        paymentProducts,
        setPaymentProducts,
        createPreference,
        getPaymentOrderNumber,
        restoreUserCart
    };
});