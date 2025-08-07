<template>
    <div class="w-full">
        <div class="bg-[#D6D6D6] flex p-1 rounded-md w-max">
            <button v-for="option in props.options" :class="['p-2 rounded-md select-none cursor-pointer text-sm', selectedOption.value === option.value ? 'bg-white' : '']" @click="handleOptionClick(option)" :key="option.value">
                {{ option.label }}
            </button>
        </div>
    </div>
</template>
<script setup>

import { ref, defineEmits } from 'vue';

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    selected: {
        type: Object,
        default: {label: 'Opción', value: 'option'}
    }
});

const emit = defineEmits(['option-changed']);

const selectedOption = ref(props.selected);

const handleOptionClick = (option) => {
    selectedOption.value = option;
    emit('option-changed', option);
};

</script>