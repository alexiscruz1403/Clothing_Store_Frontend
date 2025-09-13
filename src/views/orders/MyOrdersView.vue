<template>
    <LoadingView v-if="!displayContent" />
    <div v-else class="flex flex-col items-center gap-4 w-screen max-w-3xl px-4">
        <div class="w-full flex justify-between">
            <Heading 
                label="Mis pedidos" 
                :level="1" 
            />
            <Linker 
                label="Volver al inicio" 
                @click="handleLinkerClick"
            />
        </div>
        <div v-if="ordersEmpty" class="min-w-3xl h-96 flex items-center justify-center">
            <Text 
                label="No tienes compras realizadas."
            />
        </div>
        <div v-else class="w-full bg-white p-4 rounded-lg overflow-auto">
            <Table :headers="ORDERS_TABLE" :data="orders"/>
        </div>
    </div>
</template>
<script setup>

import Heading from '@/components/ui/Text/Heading.vue';
import Text from '@/components/ui/Text/Text.vue';
import Linker from '@/components/ui/Buttons/Linker.vue';
import LoadingView from '@/components/ui/View/LoadingView.vue';
import Table from '@/components/ui/Table/Table.vue';
import { ref, onMounted } from 'vue';
import { getUserOrders } from '@/api/orders';
import { ORDERS_TABLE } from '@/consts/ordersTable';
import router from '@/router';

const displayContent = ref(false);
const ordersEmpty = ref(true);
const orders = ref([]);

const handleLinkerClick = () => {
    router.back();
};

onMounted(async () => {
    try{
        const response = await getUserOrders();
        orders.value = response.data;
        ordersEmpty.value = orders.value.length === 0;
        displayContent.value = true;
    }catch(error){
        if(error.response && error.response.status === 401) router.push({ name: 'login' });
    }
});

</script>