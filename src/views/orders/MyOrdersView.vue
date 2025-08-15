<template>
    <LoadingView v-if="!displayContent" />
    <div v-else class="flex flex-col gap-4">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">Mis compras</h1>
            <div class="flex items-center gap-1 cursor-pointer">
                <ArrowLeft />
                <p>Volver al inicio</p>
            </div>
        </div>
        <div v-if="ordersEmpty" class="min-w-3xl h-96 flex items-center justify-center">
            <p>No tienes compras realizadas.</p>
        </div>
        <div v-else class="bg-white p-4 rounded-lg">
            <Table :headers="ORDERS_TABLE" :data="orders"/>
        </div>
    </div>
</template>
<script setup>

import LoadingView from '@/components/ui/View/LoadingView.vue';
import Table from '@/components/ui/Table/Table.vue';
import { ArrowLeft } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { getUserOrders } from '@/api/orders';
import { ORDERS_TABLE } from '@/consts/ordersTable';

const authStore = useAuthStore();

const displayContent = ref(false);
const ordersEmpty = ref(true);
const orders = ref([]);

onMounted(async () => {
    try{
        await authStore.validateSession();
        const response = await getUserOrders();
        orders.value = response.data;
        ordersEmpty.value = orders.value.length === 0;
        displayContent.value = true;
    }catch(error){

    }
});

</script>