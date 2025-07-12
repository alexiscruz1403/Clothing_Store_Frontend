<template>
    <div class="flex items-center gap-2">
        <input type="checkbox" :id="props.id" :name="props.id" class="cursor-pointer size-4 accent-[#2E2E2E] border-gray-300 rounded" @click="$emit('click')"/>
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
})

const emits = defineEmits(['click']);

</script>