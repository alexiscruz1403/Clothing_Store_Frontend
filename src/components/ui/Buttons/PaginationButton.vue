<template>
    <button :class="buttonClass" :disabled="props.disabled" @click="handleButtonClick">
        <div class="flex items-center gap-1">
            {{ props.label }}
            <MoveLeft v-if="props.icon === 'prev'" />
            <MoveRight v-if="props.icon === 'next'" />
        </div>
    </button>
</template>
<script setup>

import { computed, defineEmits } from 'vue';
import { MoveLeft, MoveRight } from 'lucide-vue-next';

const props = defineProps({
    label: {
        type: [String, Number],
        required: true
    },
    icon: {
        type: String,
        default: ''
    },
    value: {
        type: [String, Number],
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    selected: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['click']);

const buttonClass = computed(() => {
    const baseClass = 'px-4 py-2 rounded-md shadow transition duration-200';
    const disabledClass = props.disabled ? 'bg-gray-200 cursor-not-allowed' : '';
    const color = props.selected ? 'bg-blue-500 text-white cursor-pointer' : 'bg-white cursor-pointer';
    return props.disabled ? `${baseClass} ${disabledClass}` : `${baseClass} ${color}`;
});

const handleButtonClick = () => {
    if(!props.disabled){
        emit('click', props.value);
    }
};

</script>