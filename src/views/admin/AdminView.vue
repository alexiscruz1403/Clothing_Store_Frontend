<template>
    <div class="font-['Nunito'] flex flex-col gap-4">
        <div class="w-full flex justify-between">
            <h1 class="text-center text-3xl font-bold">Panel de administración</h1>
            <Linker label="Volver al inicio" @click="handleLinkerClick"/>
        </div>
        <AdminPanel />
    </div>
    <AdminModal 
        v-for="(modal, index) in modalsData"
        :key="`Modal ${index}`"
        :title="modal.title"
        :inputs="modal.inputs"
        :data="modal.data"
        :type="modal.type"
        :model="modal.model"
        @close="closeModal"
        @delete-new-data="deleteNewData"
        @add-stock="handleNewStock"
        @delete-stock="handleDeleteStock"
        @create-item="handleCreateItem"
        @update-item="handleUpdateItem"
        @delete-item="handleDeleteItem"
    />
    <ShowModal 
        v-if="showModal"
        :data="showModal.data"
        :model="showModal.model"
        @close="closeShowModal"
    />
    <ConfirmModal 
        v-if="confirmModal"
        :title="confirmModal.title"
        :content="confirmModal.content"
        :action="confirmModal.action"
        @close="closeConfirmModal"
        @confirm="handleConfirm"
    />
    <LoaderModal v-if="loading" />
</template>
<script setup>

import Linker from '@/components/ui/Buttons/Linker.vue';
import AdminPanel from '@/components/ui/Panel/AdminPanel.vue';
import AdminModal from '@/components/ui/Modals/AdminModal.vue';
import ShowModal from '@/components/ui/Modals/ShowModal.vue';
import ConfirmModal from '@/components/ui/Modals/ConfirmModal.vue';
import { ref, provide } from 'vue';
import { useAdminStore } from '@/stores/useAdminStore';
import { storeToRefs } from 'pinia';
import LoaderModal from '@/components/ui/Modals/LoaderModal.vue';

const adminStore = useAdminStore();
const { selectedData, selectedTable } = storeToRefs(adminStore);

const modalsData = ref([]);
const showModal = ref(null);
const confirmModal = ref(null);

const loading = ref(false);
provide('loading', loading);

const newData = ref({
    stocks: [],
});
provide('newData', newData);

const responseStatus = ref('');
provide('responseStatus', responseStatus);

const responseMessage = ref('');
provide('responseMessage', responseMessage);

const deleteNewData = () => {
    newData.value = {
        stocks: [],
    };
};

const handleNewStock = (data) => {
    newData.value.stocks.push(data);
    closeModal();
}

const handleDeleteStock = (data) => {
    if(newData.value && newData.value.stocks) newData.value.stocks = newData.value.stocks.filter(stock => stock.product_size !== data.product_size);
};

const handlePanelMessage = (status, message) => {
    responseStatus.value = status;
    responseMessage.value = message;
}

const createModal = (title, inputs, data, type, model = null) => {
    const newModal = {
        title,
        inputs,
        data,
        type,
    };

    newModal.model = model || selectedTable.value.value;

    if(data && data.stocks) newData.value.stocks = JSON.parse(JSON.stringify(data.stocks));

    modalsData.value.push(newModal);
};
provide('createModal', createModal);

const closeModal = () => {
    modalsData.value.pop();
};

const createShowModal = (data, model) => {
    showModal.value = {
        data,
        model
    };
};
provide('createShowModal', createShowModal);

const closeShowModal = () => {
    showModal.value = null;
};

const createConfirmModal = (title, content, action, data) => {
    confirmModal.value = {
        title,
        content,
        action: action,
        data
    };
};
provide('createConfirmModal', createConfirmModal);

const closeConfirmModal = () => {
    confirmModal.value = null;
};

const handleConfirm = async (action) => {
    loading.value = true;

    try{
        switch(action) {
            case 'delete':
                await handleDeleteItem(confirmModal.value.data);
                break;
            case 'update':
                await handleUpdateItem(confirmModal.value.data);
                break;
            case 'stock':
                handleDeleteStock(confirmModal.value.data);
                break;
        }
    }catch(error) {
        console.error('Error handling confirm action:', error);
    }finally{
        loading.value = false;
        closeConfirmModal();
    }
};

const handleCreateItem = async (data) => {
    loading.value = true;

    try{
        const response = await adminStore.createItem(data);
        await adminStore.fetchData();
        closeModal();
        console.log('Item created successfully:', response);
        handlePanelMessage('success', response.message);
    }catch(error){
        handlePanelMessage('error', error.message);
    }finally{
        loading.value = false;
        deleteNewData();
        closeModal();
    }
};

const handleUpdateItem = async (data) => {
    loading.value = true;

    try{
        const response = await adminStore.updateItem(data);
        await adminStore.fetchData();
        closeModal();
        handlePanelMessage('success', response.message);
    }catch(error) {
        handlePanelMessage('error', error.message);
    }finally{
        loading.value = false;
        deleteNewData();
    }
}

const handleDeleteItem = async (id) => {
    loading.value = true;

    try{
        const response = await adminStore.deleteItem(id);
        const params = selectedData.value.length > 0 ? { page: 1 } : null;
        await adminStore.fetchData(params);
        closeModal();
        handlePanelMessage('success', response.message);
    }catch(error) {
        handlePanelMessage('error', error.message);
    }finally{
        loading.value = false;
        deleteNewData();
    }
};

const handleLinkerClick = () => {
    router.push({ name: 'home' });
};

</script>