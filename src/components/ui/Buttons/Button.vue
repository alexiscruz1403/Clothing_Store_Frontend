<template>
    <button :type="props.function" :class="computedClass" @click="emit('click')">
        {{ props.label }}
    </button>
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
    },
    function: {
        type: String,
        default: 'button'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['click']);

const computedClass = computed(() => {
    const baseClass = 'font-["Nunito"] text-sm md:text-base px-4 py-2 rounded transition-colors duration-300';

    const typeClass = {
        primary: 'bg-[#355C7D] hover:bg-[#2C4B66] active:bg-[#22384F] text-white',
        secondary: 'bg-[#5C6B7A] hover:bg-[#4A5864] active:bg-[#3A4752] text-white',
        cancel: 'bg-[#C0392B] hover:bg-[#A93226] active:bg-[#922B21] text-white',
        confirm: 'bg-[#4CAF50] hover:[#43A047] active:bg-[#388E3C] text-white',
        gray: 'bg-[#3F3F3F] hover:bg-[#2F2F2F] active:bg-[#1F1F1F] text-white',
        brown: 'bg-[#A46B5B] text-white hover:bg-[#935E50] active:bg-[#7C4D42]',
        loading: `${textLoadingClass}`
    }[props.type] || '';

    const sizeClass = {
        medium: 'w-max',
        large: 'w-full'
    }[props.size] || '';

    const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `${baseClass} ${typeClass} ${sizeClass} ${disabledClass}`;
});

</script>