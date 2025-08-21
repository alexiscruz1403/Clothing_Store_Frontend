<template>
    <div :class="cardClass">
        <div class="flex flex-col gap-4 pb-4">
            <Heading
                label="Resumen del pedido"
                level="2"
            />
            <div class="flex flex-col gap-2">
                <div class="flex justify-between">
                    <Text 
                        label="Subtotal"
                        :class="loadingTextClass"
                    />
                    <Text 
                        :label="`$${cartSubtotal}`"
                        :class="loadingTextClass"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4 pt-4">
            <div class="flex justify-between items-center">
                <Text 
                    label="Total"
                    bold="semibold"
                    :class="loadingTextClass"
                />
                <Text 
                    :label="`$${total}`"
                    bold="extrabold"
                    :class="loadingTextClass"
                />
            </div>
            <Button :color="buttonColor" label="Pagar" size="large" @click="handlePayment"/>
            <div class="flex justify-center items-center gap-1">
                <ShieldCheck size="14" :class="[loading ? textLoadingClass : 'text-[#666666]']"/>
                <Text 
                    label="Pago seguro garantizado"
                    level="3"
                    size="xs" 
                    :class="loadingTextClass"
                />
            </div>
        </div>
        <LoaderModal v-if="displayLoaderModal" />
    </div>
</template>
<script setup>

import Heading from '../Text/Heading.vue';
import Text from '../Text/Text.vue';
import Button from '../Buttons/Button.vue';
import LoaderModal from '../Modals/LoaderModal.vue';
import { ShieldCheck } from 'lucide-vue-next';
import { ref, computed, onMounted, inject } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { usePaymentStore } from '@/stores/usePaymentStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { storeToRefs } from 'pinia';
import { bgLoadingCLass, textLoadingClass } from '@/consts/loadingClasses';

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

const paymentStore = usePaymentStore();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const loading = inject('loading');
const displayConfirmModal = inject('displayConfirmModal');

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

const loadingTextClass = computed(() => {
    return loading.value ? `${textLoadingClass}` : '';
});

const buttonColor = computed(() => {
    return loading.value ? 'loading' : 'primary';
});

const handlePayment = async () => {
    if (loading.value) return;

    if(!user.value.address){
        displayConfirmModal("Dirección requerida", "Por favor, complete su dirección antes de continuar.");
        return;
    }

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