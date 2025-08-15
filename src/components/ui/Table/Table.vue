<template>
    <table class="table-auto border-collapse w-full relative">
        <thead>
            <tr class="bg-gray-200">
                <th v-for="header in headers" class="p-2">{{ header.label }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="data in props.data" class="relative">
                <TableData v-for="header in props.headers" 
                    :header="header" 
                    :data="data[header.key]" 
                    @update-item="handleUpdateItem(data)" 
                    @delete-item="handleDeleteItem(data)"
                    @view-detail="handleViewDetail(data)"
                    @proceed-order="handleProceedOrder(data)"
                    @cancel-order="handleCancelOrder(data)" 
                />
            </tr>
        </tbody>
    </table>
</template>
<script setup>

import TableData from './TableData.vue';
import { inject } from 'vue';
import router from '@/router';

const props = defineProps({
    headers: {
        type: Array,
        required: true
    },
    data: { 
        type: Array,
        required: true
    },
    inputs: {
        type: Array
    },
    model: {
        type: String,
        default: ''
    }, 
});

const createModal = inject('createModal');

const createConfirmModal = inject('createConfirmModal');

const handleUpdateItem = (data) => {
    const dataKeys = Object.keys(data);
    const newTitle = dataKeys.length > 0 ? `Actualizar ${data[dataKeys[1]]}` : `Actualizar ${props.model}`;
    createModal(newTitle, props.inputs, data, 'update');
};

const handleDeleteItem = (data) => {
    const dataKeys = Object.keys(data);
    const title = `¿Estás seguro de que deseas eliminar este item?`;
    const content = `Al aceptar, se eliminará el item "${data[dataKeys[1]]}" de forma permanente. Esta acción no se puede deshacer.`;
    createConfirmModal(title, content, 'delete', data);
};

const handleViewDetail = (data) => {
    router.push({ name: 'myOrderDetail', params: { id: data.order_id } });
}

const handleProceedOrder = (data) => {
    const title = `¿Estás seguro de que deseas avanzar en la compra?`;
    const content = `Al aceptar, la compra avanzará al estado ${data.next_status.status_name}`;
    const modalData = {
        order_id: data.order_id,
        next_status: data.next_status
    }
    createConfirmModal(title, content, 'update', modalData);
}

const handleCancelOrder = (data) => {
    const title = `¿Estás seguro de que deseas cancelar la compra?`;
    const content = `Al aceptar, la compra será cancelada y no se podrá recuperar.`;
    const modalData = {
        order_id: data.order_id,
        next_status: data.next_status
    }
    createConfirmModal(title, content, 'delete', modalData);
};

</script>