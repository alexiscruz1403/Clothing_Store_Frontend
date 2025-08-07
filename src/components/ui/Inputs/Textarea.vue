<template>
    <div class="flex flex-col gap-1">
        <label :for="props.label">{{ props.label }}</label>
        <textarea :name="props.label" :id="props.label" v-model="model" class="p-2 border border-gray-300 w-64 h-20 focus:outline-none" :disabled="!props.modifiable" @input="handleInputChange"></textarea>
        <span class="text-sm text-[#C0392B]">{{ props.error }}</span>
    </div>
</template>
<script setup>

import { defineModel, defineEmits } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: 'Etiqueta'
    },
    error: {
        type: String,
        default: ''
    },
    modifiable: {
        type: Boolean,
        default: true
    }
});

const model = defineModel();

const emit = defineEmits(['input-change']);

const handleInputChange = () => {
    emit('input-change', model);
};

</script>