<template>
    <div :class="['flex flex-col gap-5', showEmptyMessage ? 'w-[90%]' : 'w-full md:w-max']">
        <h1 class="text-center md:text-left text-3xl font-bold">Mi carrito</h1>
        <div v-if="showEmptyMessage" class="flex flex-col items-center justify-center gap-3 md:gap-2">
            <ShoppingBag size="40"/>
            <h2 class="text-xl font-bold">Tu carrito está vacío</h2>
            <p class="md:text-lg">Parece que aún no has agregado productos a tu carrito</p>
            <Button type="primary" label="Explorar productos" :onClick="handleExploreButtonClick"/>
        </div>
        <div v-else class="flex flex-col md:flex-row items-center md:items-start md:justify-center 
            gap-4 lg:gap-8">
            <CartList :products="cartItems" />
            <CartSummary />
        </div>
    </div>
    <ConfirmModal v-if="confirmModal" 
        :title="confirmModal.title" 
        :content="confirmModal.content"
        @confirm="handleConfirm" 
        @close="closeConfirmModal"
    />
</template>
<script setup>

import CartSummary from '@/components/ui/Cards/CartSummary.vue';
import CartList from '@/components/ui/Lists/CartList.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import ConfirmModal from '@/components/ui/Modals/ConfirmModal.vue';
import { ShoppingBag } from 'lucide-vue-next';
import { ref, onMounted, computed, provide } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { storeToRefs } from 'pinia';
import router from '@/router';

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

const loading = ref(true);
provide('loading', loading);

const confirmModal = ref(null);

const showEmptyMessage = computed(() => {
    return cartItems.value.length === 0 && !loading.value;
});

const displayConfirmModal = (title, content) => {
    confirmModal.value = { title, content };
}
provide('displayConfirmModal', displayConfirmModal);

const handleConfirm = () => {
    confirmModal.value = null;
    router.push({ name: 'myProfile' });
}

const closeConfirmModal = () => {
    confirmModal.value = null;
}

const handleExploreButtonClick = () => {
    router.push({ name: 'products' });
}

onMounted(async () => {
    await cartStore.fetchCart();
    loading.value = false;
});

</script>