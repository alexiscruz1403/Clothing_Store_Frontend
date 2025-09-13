<template>
    <div class="bg-white min-h-full w-full flex flex-col items-center gap-4 rounded-lg p-4 shadow-md">
        <PanelOptions 
            :options="adminPanelOptions" 
            :selected="selectedTable" 
            @option-changed="handleOptionChange"
        />
        <div class="flex justify-between items-center w-full">
            <Heading
                :label="selectedTable.label"
                :level="2"
            />
            <Button 
                v-if="displayButton"
                :label="addButtonLabel" 
                color="primary" 
                @click="handleCreateData"
            >
                <template v-slot:left-icon>
                    <Plus size="16" />
                </template>
            </Button>
        </div>
        <PanelMessage
            v-if="displayPanelMessage" 
            :status="responseStatus"
            :message="responseMessage" 
        />
        <div class="w-full overflow-auto flex flex-col">
            <Table 
                :headers="tableHeaders" 
                :inputs="selectedInputs" 
                :data="selectedData"
                :model="selectedTable.value"     
            />
        </div>
        <Pagination 
            :current="currentPage" 
            :last="lastPage" 
            @page-change="handlePageChange"
        />
    </div>
</template>
<script setup>

import { Plus } from 'lucide-vue-next';
import Heading from '../Text/Heading.vue';
import PanelOptions from '@/components/ui/Panel/PanelOptions.vue';
import PanelMessage from './PanelMessage.vue';
import Button from '../Buttons/Button.vue';
import Table from '../Table/Table.vue';
import Pagination from '../Pagination/Pagination.vue';
import { ref, watch, onMounted, inject } from 'vue';
import { useAdminStore } from '@/stores/useAdminStore';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const { adminPanelOptions, selectedTable, tableHeaders, selectedData, selectedInputs, currentPage, lastPage } = storeToRefs(adminStore);

const displayButton = ref(selectedTable.value.value !== 'orders');
const addButtonLabel = ref(`Agregar ${selectedTable.value.label.toLowerCase().slice(0, -1)}`);
const displayPanelMessage = ref(false);

const createModal = inject('createModal');
const loading = inject('loading');
const responseStatus = inject('responseStatus');
const responseMessage = inject('responseMessage');

const handleOptionChange = async (option) => {
    loading.value = true;

    selectedTable.value = option;
    selectedData.value = [];
    await adminStore.fetchData();

    displayButton.value = selectedTable.value.value !== 'orders';
    if(displayButton.value) addButtonLabel.value = `Agregar ${option.label.toLowerCase().slice(0, -1)}`;

    loading.value = false;
};

const handleCreateData = () => {
    const newTitle = `Agregar nuevo ${selectedTable.value.label.toLowerCase()}`;
    const newInputs = selectedInputs.value.map((group) => {
        return group.filter((input) => {
            if(input.label === 'ID') return;
            return input;
        });
    });
    if(selectedTable.value.value === 'users'){
        newInputs[1].push({ label: 'Contraseña', key: 'password', type: 'password', modifiable: true, required: true });
    }
    createModal(newTitle, newInputs, {}, 'create', selectedTable.value.value);
}

const handlePageChange = async (params) => {
    loading.value = true;
    await adminStore.fetchData(params);
    loading.value = false;
};

onMounted(async () => {
    loading.value = true;
    await adminStore.fetchData();
    loading.value = false;
});

watch([responseStatus, responseMessage], ([status, message]) => {
    if(message && status){
        displayPanelMessage.value = true;
        setTimeout(() => {
            responseStatus.value = '';
            responseMessage.value = '';
        }, 3000);
    }
});

</script>