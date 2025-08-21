<template>
    <LoadingView v-if="!displayContent" />
    <div v-else class="min-w-xl flex flex-col gap-4">
        <div class="w-full flex justify-between">
            <Heading 
                label="Detalle de la compra" 
                level="1"
            />
            <Linker 
                label="Volver a mis pedidos" 
                @click="handleLinkerClick"
            />
        </div>
        <div class="flex flex-col bg-white p-4 rounded-md divide-y divide-gray-300">
            <div class="flex flex-col gap-2 pb-4">
                <Heading
                    label="Información de la compra"
                    level="2"
                />
                <div>
                    <div class="flex gap-1">
                        <Text 
                            label="ID de la compra:"
                            bold="semibold"
                        />
                        <Text 
                            :label="order.order_id"
                        />
                    </div>
                    <div class="flex gap-1">
                        <Text 
                            label="Fecha de la compra:"
                            bold="semibold"
                        />
                        <Text 
                            :label="order.order_date"
                        />
                    </div>
                    <div class="flex gap-1">
                        <Text 
                            label="Estado de la compra:"
                            bold="semibold"
                        />
                        <Text 
                            :label="order.status"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-1 py-4">
                <Heading
                    label="Dirección de envío"
                    level="2"
                />
                <div>
                    <div class="flex gap-1">
                        <Text 
                            label="Calle:"
                            bold="semibold"
                        />
                        <Text 
                            :label="order.order_address.address_line"
                        />
                    </div>
                    <div class="flex gap-1">
                        <Text 
                            label="Número de casa:"
                            bold="semibold"
                        />
                        <Text 
                            :label="order.order_address.house_number"
                        />
                    </div>
                    <div class="flex gap-1">
                        <Text 
                            label="Ciudad:"
                            bold="semibold"
                        />
                        <Text 
                            :label="order.order_address.city"
                        />
                    </div>
                    <div class="flex gap-1">
                        <Text 
                            label="Provincia:"
                            bold="semibold"
                        />
                        <Text 
                            :label="order.order_address.state"
                        />
                    </div>
                    <div class="flex gap-1">
                        <Text 
                            label="Código Postal:"
                            bold="semibold"
                        />
                        <Text 
                            :label="order.order_address.postal_code"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-1 py-4">
                <Heading
                    label="Productos comprados"
                    level="2"
                />
                <div v-for="item in order.products" :key="item.id" class="flex items-center justify-between py-2">
                    <div>
                        <Text 
                            :label="`${item.product_name} Talle ${item.pivot.product_size}`" 
                        />
                        <Text 
                            :label="`Cantidad: ${item.pivot.product_quantity}`"
                            :level="3"
                            size="sm"
                        />
                    </div>
                    <Text 
                        :label="`$${item.pivot.product_price}`"
                    />
                </div>
            </div>
            <div class="pt-4 font-bold flex justify-between">
                <Text 
                    label="Total de la compra:"
                    bold="bold"
                />
                <Text 
                    :label="`$${order.total}`"
                    bold="bold"
                />
            </div>
        </div>
    </div>
</template>
<script setup>

import Heading from '@/components/ui/Text/Heading.vue';
import Text from '@/components/ui/Text/Text.vue';
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