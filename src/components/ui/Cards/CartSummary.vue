<template>
    <div :class="cardClass">
        <div class="flex flex-col gap-4 pb-4">
            <h2 class="text-lg font-bold">Resumen del pedido</h2>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <p :class="commonTextClass">Subtotal</p>
                    <p :class="commonTextClass">${{ cartSubtotal }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4 pt-4">
            <div class="flex justify-between items-center">
                <p :class="semiboldTextClass">Total</p>
                <p :class="extraboldTextClass">${{ total }}</p>
            </div>
            <Button :type="buttonType" label="Pagar" size="large" @click="handlePayment"/>
            <div class="flex justify-center items-center gap-1">
                <ShieldCheck size="14" :class="footerIconClass"/>
                <p :class="footerTextClass">Pago seguro garantizado</p>
            </div>
        </div>
        <LoaderModal v-if="displayLoaderModal" />
    </div>
</template>
<script setup>

import Button from '../Buttons/Button.vue';
import LoaderModal from '../Modals/LoaderModal.vue';
import { ShieldCheck } from 'lucide-vue-next';
import { ref, computed, onMounted, inject } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { usePaymentStore } from '@/stores/usePaymentStore';
import { storeToRefs } from 'pinia';
import { bgLoadingCLass, textLoadingClass } from '@/consts/loadingClasses';

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

const paymentStore = usePaymentStore();

const loading = inject('loading');

const displayLoaderModal = ref(false);

const cartSubtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.product_price * item.product_quantity), 0).toFixed(2);
});

const total = computed(() => {
    return (parseFloat(cartSubtotal.value)).toFixed(2);
});

const cardClass = computed(() => {
    const baseClass = "w-[90%] md:w-80 h-max md:sticky md:top-5 font-['Nunito'] p-4 rounded-lg shadow-md flex flex-col divide-y divide-gray-300";
    return loading.value ? `${baseClass} ${bgLoadingCLass}` : `${baseClass} text-[#2E2E2E] bg-white`;
});

const commonTextClass = computed(() => {
    return loading.value ? `${textLoadingClass}` : '';
});

const semiboldTextClass = computed(() => {
    return loading.value ? `${textLoadingClass}` : 'font-semibold';
});

const extraboldTextClass = computed(() => {
    return loading.value ? `${textLoadingClass}` : 'font-extrabold';
});

const footerIconClass = computed(() => {
    return loading.value ? `${textLoadingClass}` : 'text-gray-500';
});

const footerTextClass = computed(() => {
    return loading.value ? `${textLoadingClass}` : 'text-xs text-gray-500';
});

const buttonType = computed(() => {
    return loading.value ? 'loading' : 'primary';
});

const handlePayment = async () => {
    if (loading.value) return;
    displayLoaderModal.value = true;
    try{
        paymentStore.setPaymentProducts(cartItems.value);
        const preferenceId = await paymentStore.createPreference();
        window.location.href = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
    }catch(error){
        console.error("Error during payment:", error);
    }finally{
        displayLoaderModal.value = false;
    }
}

onMounted(async () => {
    await cartStore.fetchCart();
});

</script>