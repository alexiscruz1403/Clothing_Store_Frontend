<template>
    <button :type="props.function" :class="computedClass" @click="emit('click')">
        <span class="flex items-center gap-1 w-max">
            <slot name="left-icon"></slot>
            {{ props.label }}
            <slot name="right-icon"></slot>
        </span>
    </button>
</template>
<script setup>

import { computed, defineEmits } from 'vue';
import { textLoadingClass } from '@/consts/loadingClasses';

const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    label: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'medium'
    },
    color: {
        type: String,
        default: 'primary'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['click']);

const computedClass = computed(() => {
    const baseClass = 'font-["Nunito"] text-sm px-4 py-2 rounded transition-colors duration-300 flex items-center justify-center';

    const colorClass = {
        primary: 'bg-[#355C7D] hover:bg-[#2C4B66] active:bg-[#22384F] text-white',
        secondary: 'bg-[#6D7D8B] hover:bg-[#5C6A76] active:bg-[#49555F] text-white',
        tertiary: 'bg-[#7A8E6A] hover:bg-[#6A7A5B] active:bg-[#59684D] text-white',
        cancel: 'bg-[#C0392B] hover:bg-[#A93226] active:bg-[#922B21] text-white',
        confirm: 'bg-[#4CAF50] hover:[#43A047] active:bg-[#388E3C] text-white',
        gray: 'bg-[#3F3F3F] hover:bg-[#2F2F2F] active:bg-[#1F1F1F] text-white',
        transparent: 'bg-transparent text-black hover:bg-gray-200 border border-black',
        brown: 'bg-[#A46B5B] text-white hover:bg-[#935E50] active:bg-[#7C4D42]',
        loading: `${textLoadingClass}`
    }[props.color] || '';

    const sizeClass = {
        medium: 'w-max',
        large: 'w-full'
    }[props.size] || '';

    const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `${baseClass} ${colorClass} ${sizeClass} ${disabledClass}`;
});

</script>