<template>
    <div class="flex items-center gap-2" @click="$emit('click')">
        <input type="radio" name="genres" :id="props.id" class="cursor-pointer size-4 accent-[#2E2E2E] border-gray-300 rounded" :checked="props.checked" />
        <label class="cursor-pointer text-[#2E2E2E] font-['Nunito']">{{ props.label }}</label>
    </div>
</template>
<script setup>

import { defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
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

const emits = defineEmits(['click']);

</script>