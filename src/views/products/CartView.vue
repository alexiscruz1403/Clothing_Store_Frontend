<template>
    <Header />
    <main class="min-h-screen w-screen md:w-full flex justify-center py-5 bg-[#E8DCCB] text-[#2E2E2E] font-['Nunito']">
        <div :class="['flex flex-col gap-5', emptyCart ? 'w-[90%]' : 'w-full md:w-max']">
            <h1 class="text-center md:text-left text-3xl font-bold">Mi carrito</h1>
            <div v-if="emptyCart" class="flex flex-col items-center justify-center gap-3 md:gap-2">
                <ShoppingBag size="40"/>
                <h2 class="text-xl font-bold">Tu carrito está vacío</h2>
                <p class="md:text-lg">Parece que aún no has agregado productos a tu carrito</p>
                <Button type="primary" label="Explorar productos" :onClick="handleExploreButtonClick"/>
            </div>
            <div v-else class="flex flex-col md:flex-row items-center md:items-start md:justify-center 
             gap-4 lg:gap-8">
                <CartList :products="cartItems"/>
                <CartSummary />
            </div>
        </div>
    </main>
    <Footer />
</template>
<script setup>

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import CartSummary from '@/components/ui/Cards/CartSummary.vue';
import CartList from '@/components/ui/Lists/CartList.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import { ShoppingBag } from 'lucide-vue-next';
import { onMounted, computed } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { storeToRefs } from 'pinia';
import router from '@/router';

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

onMounted(async () => {
    await cartStore.fetchCart();
});

const emptyCart = computed(() => {
    return cartItems.value.length === 0;
});

const handleExploreButtonClick = () => {
    router.push({ name: 'products' });
}

</script>