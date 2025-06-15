<template>
    <div class="flex flex-col gap-1">
        <label :for="props.label">{{ props.label }} <span v-if="props.required" class="text-red-500">*</span></label>
        <input :id="props.label" :name="props.label" :type="props.type" :placeholder="props.placeholder" v-model="model" class="outline-none rounded-md border border-gray-300 py-1 px-2">
        <label v-if="props.error" :for="props.label" class="text-sm text-[#C0392B]">{{ props.error }}</label>
    </div>
</template>
<script setup>

import { defineModel } from 'vue';

const props = defineProps({
    type:{
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: 'Ingrese un valor'
    },
    label: {
        type: String,
        default: 'Etiqueta'
    },
    required: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    }
});

const model = defineModel();

</script>