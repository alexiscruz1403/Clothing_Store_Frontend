<template>
    <div class="w-[90%] md:w-80 h-max md:sticky md:top-5 font-['Nunito'] text-[#2E2E2E] bg-white p-4 rounded-lg shadow-md flex flex-col divide-y divide-gray-300">
        <div class="flex flex-col gap-4 pb-4">
            <h2 class="text-lg font-bold">Resumen del pedido</h2>
            <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <p>Subtotal</p>
                    <p>${{ cartSubtotal }}</p>
                </div>
                <div class="flex justify-between">
                    <p>Envío</p>
                    <p>${{ shippingCost }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4 pt-4">
            <div class="flex justify-between items-center">
                <p class="font-semibold">Total</p>
                <p class="font-extrabold">${{ total }}</p>
            </div>
            <Button type="primary" label="Pagar"/>
            <div class="flex justify-center items-center gap-1">
                <ShieldCheck size="14" class="text-gray-500"/>
                <p class="text-xs text-gray-500">Pago seguro garantizado</p>
            </div>
        </div>
    </div>
</template>
<script setup>

import { ShieldCheck } from 'lucide-vue-next';
import Button from '../Buttons/Button.vue';
import { computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();

const { cartItems, shippingCost } = storeToRefs(cartStore);

const cartSubtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.product_price * item.product_quantity), 0).toFixed(2);
});

const total = computed(() => {
    return (parseFloat(cartSubtotal.value) + parseFloat(shippingCost.value)).toFixed(2);
});

onMounted(async () => {
    await cartStore.fetchCart();
});

</script>