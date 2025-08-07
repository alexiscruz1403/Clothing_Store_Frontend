<template>
    <div class="flex flex-col gap-1">
        <label :for="props.label">{{ props.label }} <span v-if="props.required" class="text-red-500">*</span></label>
        <select class="outline-none rounded-md border border-gray-300 py-1 px-2" v-model="model" :disabled="!props.modifiable" @change="handleInputChange">
            <option v-for="option in props.options" :key="option" :value="option">{{ option }}</option>
        </select>
        <label v-if="props.error" :for="props.label" class="text-sm text-[#C0392B]">{{ props.error }}</label>
    </div>
</template>
<script setup>

import { defineModel, defineEmits } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    required: {
        type: Boolean,
        default: false
    },
    modifiable: {
        type: Boolean,
        default: true
    },
    error: {
        type: String,
        default: ''
    }
});

const model = defineModel();

const emit = defineEmits(['input-change']);

const handleInputChange = () => {
    emit('input-change', model);
};

</script>