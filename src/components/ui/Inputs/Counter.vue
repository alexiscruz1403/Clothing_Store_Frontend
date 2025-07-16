<template>
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
            <button :class="buttonsClass" @click="decrement">
                <Minus size="16" />
            </button>
            <input type="number" v-model="quantity" :class="inputClass" @input="change" @focusout="reset">
            <button :class="buttonsClass" @click="increment">
                <Plus size="16" />
            </button>
        </div>
    </div>
</template>
<script setup>

import { Plus, Minus } from 'lucide-vue-next';
import { defineModel, computed, defineEmits, inject } from 'vue';
import { textLoadingClass } from '@/consts/loadingClasses';

const props = defineProps({
    min: {
        type: Number,
        default: 1
    },
    max: {
        type: Number,
        default: 100
    }
})

const quantity = defineModel({
    type: Number,
    default: 1
});

const emit = defineEmits(['quantityChanged']);

const loading = inject('loading');

const buttonsClass = computed(() => {
    const baseClass = "p-2 md:p-3 rounded-md";
    return loading.value ? `${baseClass} ${textLoadingClass}` : `${baseClass} bg-[#f0ece0] text-[#2E2E2E] cursor-pointer hover:bg-[#e0dcd0] transition-colors duration-300`;
});

const inputClass = computed(() => {
    const baseClass = "outline-none text-center w-16";
    return loading.value ? `${baseClass} ${textLoadingClass}` : `${baseClass}`;
});

const increment = () => {
    if(loading.value) return;

    if(quantity.value >= props.max) return;

    const newValue = quantity.value + 1;
    
    emit('quantityChanged', newValue);
};

const decrement = () => {
    if(loading.value) return;

    if(quantity.value <= props.min) return;

    const newValue = quantity.value - 1;
    
    emit('quantityChanged', newValue);
};

const change = (event) => {
    if(loading.value) return;

    if(event.target.value === '') {
        return;
    }

    if(event.target.value < props.min || event.target.value > props.max){
        event.target.value = parseInt(quantity.value);
        return;
    }

    const newValue = parseInt(event.target.value);

    emit('quantityChanged', newValue);
}

const reset = (event) => {
    if(event.target.value === '') {
        event.target.value = parseInt(quantity.value);
    }
};

</script>