<template>
    <LoadingView v-if="!displayContent" />
    <div v-else class="min-w-xl flex flex-col gap-4">
        <div class="w-full flex justify-between">
            <h1 class="text-center text-3xl font-bold">Detalles de la compra</h1>
            <Linker label="Volver a mis pedidos" @click="handleLinkerClick"/>
        </div>
        <div class="flex flex-col bg-white p-4 rounded-md divide-y divide-gray-300">
            <div class="flex flex-col gap-2 pb-4">
                <h2 class="text-xl font-semibold">Información de la compra</h2>
                <div>
                    <p><span class="font-bold">ID de la compra:</span> {{ order.order_id }}</p>
                    <p><span class="font-bold">Fecha de la compra:</span> {{ order.order_date }}</p>
                    <p><span class="font-bold">Estado de la compra:</span> {{ order.status }}</p>
                </div>
            </div>
            <div class="flex flex-col gap-1 py-4">
                <h2 class="text-xl font-semibold">Dirección de envío</h2>
                <div>
                    <p><span class="font-bold">Calle:</span> {{ order.order_address.address_line }}</p>
                    <p><span class="font-bold">Número de casa:</span> {{ order.order_address.house_number }}</p>
                    <p><span class="font-bold">Ciudad:</span> {{ order.order_address.city }}</p>
                    <p><span class="font-bold">Provincia:</span> {{ order.order_address.state }}</p>
                    <p><span class="font-bold">Código Postal:</span> {{ order.order_address.postal_code }}</p>
                </div>
            </div>
            <div class="flex flex-col gap-1 py-4">
                <h2 class="text-xl font-semibold">Productos comprados</h2>
                <div v-for="item in order.products" :key="item.id" class="flex items-center justify-between py-2">
                    <div>
                        <p>{{ item.product_name }} Talle {{ item.pivot.product_size }}</p>
                        <p class="text-xs text-[#888888]">Cantidad: {{ item.pivot.product_quantity }}</p>
                    </div>
                    <p>${{ item.pivot.product_price }}</p>
                </div>
            </div>
            <div class="pt-4 font-bold flex justify-between">
                <p>Total:</p>
                <p>${{ order.total }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>

import Linker from '@/components/ui/Buttons/Linker.vue';
import LoadingView from '@/components/ui/View/LoadingView.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getOrder } from '@/api/orders.js';
import router from '@/router';

const displayContent = ref(false);
const order = ref(null);

const handleLinkerClick = () => {
    router.push({ name: 'myOrders' });
};

onMounted(async() => {
    const route = useRoute();
    const orderId = route.params.id;
    try{
        const response = await getOrder(orderId);
        order.value = response.data;
        displayContent.value = true;
    }catch(error){

    }
});
</script>