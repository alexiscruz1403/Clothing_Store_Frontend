<template>
    <LoadingView v-if="!displayContent" />
</template>
<script setup>

import LoadingView from '@/components/ui/View/LoadingView.vue';
import { ref, onMounted } from 'vue';
import { usePaymentStore } from '@/stores/usePaymentStore';
import router from '@/router';

const paymentStore = usePaymentStore();

const displayContent = ref(false);

onMounted(async() => {
    try {
        await paymentStore.restoreUserCart();
        router.push({ name: 'cart' });
    } catch (error) {
        router.push({ name: 'home' });
    }
})
</script>