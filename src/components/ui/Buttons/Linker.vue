<template>
    <button type="button" class="hidden md:block md:text-lg cursor-pointer" @click="handleButtonClick">
        <span class="flex items-center gap-1 text-[#4F4F4F]">
            <ArrowLeft size="20" />
            {{ props.label }}
        </span>
    </button>
</template>
<script setup>

import { ArrowLeft } from 'lucide-vue-next';
import { defineEmits } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: 'Volver'
    }
})

const emit = defineEmits(['click']);

const handleButtonClick = () => {
    emit('click');
}

</script>