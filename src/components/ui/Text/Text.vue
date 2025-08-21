<template>
    <p :class="computedClass">{{ label }}</p>
</template>
<script setup>

import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    size: {
        type: String,
        default: 'base'
    }, 
    bold: {
        type: String,
        default: 'normal'
    },
    class: {
        type: String,
        default: ''
    }
});

const computedClass = computed(() => {
    const sizeClass = `text-${props.size}`;
    const colorClass = props.level == 1 ? 'text-[#2E2E2E]' : props.level == 2 ? 'text-[#4F4F4F]' : 'text-[#666666]';
    const boldClass = `font-${props.bold}`;

    if(props.class.includes('text-transparent')) return `${sizeClass} ${props.class} ${boldClass}`;

    return `${sizeClass} ${colorClass} ${boldClass} ${props.class}`;
});

</script>