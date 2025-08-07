<template>
    <div class="bg-black/50 h-screen w-screen p-5 flex justify-center items-center fixed top-0 left-0">
        <div class="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-3">
            <h1 class="text-xl text-center font-bold">{{ title }}</h1>
            <Table :headers="headers" :data="props.data" />
            <Button label="Cerrar" type="primary" @click="handleCloseModal" />
        </div>
    </div>
</template>
<script setup>

import Table from '../Table/Table.vue';
import Button from '../Buttons/Button.vue';
import { defineEmits, computed } from 'vue';
import { SHOW_MODAL_HEADERS } from '@/consts/showModal';

const props = defineProps({
    model: {
        type: String,
        default: 'defaultModel'
    },
    data: {
        type: [Object, Array]
    }
});

const emit = defineEmits(['close']);

const title = computed(() => {
    switch (props.model) {
        case 'products':
            return 'Lista de Productos';
        case 'statuses':
            return 'Lista de Estados';
    }
});

const headers = computed(() => {
    return SHOW_MODAL_HEADERS[props.model] || [];
});

const handleCloseModal = () => {
    emit('close');
};

</script>