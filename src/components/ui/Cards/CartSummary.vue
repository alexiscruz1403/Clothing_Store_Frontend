<template>
    <div :class="cardClass">
        <div class="flex flex-col gap-4 pb-4">
            <h2 class="text-lg font-bold">Resumen del pedido</h2>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <p :class="commonTextClass">Subtotal</p>
                    <p :class="commonTextClass">${{ cartSubtotal }}</p>
                </div>
                <div class="flex justify-between">
                    <p :class="commonTextClass">Envío</p>
                    <p :class="commonTextClass">${{ shippingCost }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4 pt-4">
            <div class="flex justify-between items-center">
                <p :class="semiboldTextClass">Total</p>
                <p :class="extraboldTextClass">${{ total }}</p>
            </div>
            <Button :type="buttonType" label="Pagar" size="large" />
            <div class="flex justify-center items-center gap-1">
                <ShieldCheck size="14" :class="footerIconClass"/>
                <p :class="footerTextClass">Pago seguro garantizado</p>
            </div>
        </div>
    </div>
</template>
<script setup>

import { ShieldCheck } from 'lucide-vue-next';
import Button from '../Buttons/Button.vue';
import { computed, onMounted, inject } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { storeToRefs } from 'pinia';
import { bgLoadingCLass, textLoadingClass } from '@/consts/loadingClasses';

const cartStore = useCartStore();

const { cartItems, shippingCost } = storeToRefs(cartStore);

const loading = inject('loading');

const cartSubtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.product_price * item.product_quantity), 0).toFixed(2);
});

const total = computed(() => {
    return (parseFloat(cartSubtotal.value) + parseFloat(shippingCost.value)).toFixed(2);
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

onMounted(async () => {
    await cartStore.fetchCart();
});

</script>