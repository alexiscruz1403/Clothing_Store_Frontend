<template>
    <button :class="computedClass" @click="emit('click')">{{ props.label }}</button>
</template>

<script setup>

import { computed, defineEmits } from 'vue';
import { textLoadingClass } from '@/consts/loadingClasses';

const props = defineProps({
    type: {
        type: String,
        default: 'primary'
    },
    label: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'medium'
    }
})

const emit = defineEmits(['click']);

const computedClass = computed(() => {
    const baseClass = 'font-["Nunito"] text-sm md:text-base px-4 py-2 rounded transition-colors duration-300';

    const typeClass = {
        primary: 'bg-[#355C7D] hover:bg-[#2C4B66] active:bg-[#22384F] cursor-pointer text-white',
        secondary: 'bg-[#5C6B7A] hover:bg-[#4A5864] active:bg-[#3A4752] cursor-pointer text-white',
        cancel: 'bg-[#C0392B] hover:bg-[#A93226] active:bg-[#922B21] cursor-pointer text-white',
        confirm: 'bg-[#4CAF50] hover:[#43A047] active:bg-[#388E3C] cursor-pointer text-white',
        gray: 'bg-[#3F3F3F] hover:bg-[#2F2F2F] active:bg-[#1F1F1F] cursor-pointer text-white',
        brown: 'bg-[#A46B5B] text-white hover:bg-[#935E50] active:bg-[#7C4D42]',
        loading: `${textLoadingClass}`
    }[props.type] || '';

    const sizeClass = {
        medium: 'w-max',
        large: 'w-full'
    }[props.size] || '';

    return `${baseClass} ${typeClass} ${sizeClass}`;
});

</script>