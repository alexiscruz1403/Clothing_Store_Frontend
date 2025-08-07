<template>
    <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center">
            <label :for="props.label">
                {{ props.label }} 
                <span v-if="props.required" class="text-red-500">
                    *
                </span>
            </label>
            <div v-if="props.displayDelete" @click="handleDeleteItem" class="cursor-pointer">
                <CircleX :size="20" color="red" :stroke-width="1"  fill="white"/>
            </div>
        </div>
        <input :id="props.label" :name="props.label" :type="props.type" :placeholder="props.placeholder" v-model="model" class="outline-none rounded-md border border-gray-300 py-1 px-2" :readonly="!props.modifiable" @input="handleInputChange"/>
        <label v-if="props.error" :for="props.label" class="text-sm text-[#C0392B]">{{ props.error }}</label>
    </div>
</template>
<script setup>

import { defineModel, defineEmits } from 'vue';
import { CircleX } from 'lucide-vue-next';

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
    modifiable: {
        type: Boolean,
        default: true
    },
    displayDelete: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    }
});

const model = defineModel();

const emit = defineEmits(['delete-input', 'input-change']);

const handleDeleteItem = () => {
    emit('delete-input', props.label, model);
};

const handleInputChange = () => {
    emit('input-change');
};

</script>