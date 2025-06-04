<template>
    <button :class="computedClass" @click="props.onClick">{{ props.label }}</button>
</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'primary'
    },
    label: {
        type: String,
        default: ''
    },
    onClick: {
        type: Function,
        default: () => {}
    }
})

const computedClass = computed(() => {
    const baseClass = 'font-["Nunito"] text-white px-4 py-2 rounded cursor-pointer transition-colors duration-300';
    const typeClass = {
        primary: 'bg-[#355C7D] hover:bg-[#2C4B66] active:bg-[#22384F]',
        secondary: 'bg-[#5C6B7A] hover:bg-[#4A5864] active:bg-[#3A4752]',
        cancel: 'bg-[#C0392B] hover:bg-[#A93226] active:bg-[#922B21]',
        confirm: 'bg-[#4CAF50] hover:[#43A047] active:bg-[#388E3C]'
    }[props.type] || '';
    return `${baseClass} ${typeClass}`;
});

</script>