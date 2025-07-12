<template>
    <div class="flex items-center gap-2">
        <input type="radio" name="genres" :id="props.id" class="cursor-pointer size-4 accent-[#2E2E2E] border-gray-300 rounded" @click="emit('click')"/>
        <label :for="props.id" class="cursor-pointer text-[#2E2E2E] font-['Nunito']">{{ props.label }}</label>
    </div>
</template>
<script setup>

import { defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: 'radio-group'
    }
})

const emit = defineEmits(['click']);

</script>