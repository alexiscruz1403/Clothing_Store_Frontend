<template>
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
            <button class="bg-[#f0ece0] text-[#2E2E2E] p-2 md:p-3 rounded-md cursor-pointer hover:bg-[#e0dcd0] transition-colors duration-300" @click="increment">
                <Plus size="16" />
            </button>
            <input type="number" v-model="quantity" class="outline-none text-center w-16" @input="change" @focusout="reset">
            <button class="bg-[#f0ece0] text-[#2E2E2E] p-2 md:p-3 rounded-md cursor-pointer hover:bg-[#e0dcd0] transition-colors duration-300" @click="decrement">
                <Minus size="16" />
            </button>
        </div>
    </div>
</template>
<script setup>

import { Plus, Minus } from 'lucide-vue-next';
import { defineModel } from 'vue';

const props = defineProps({
    min: {
        type: Number,
        default: 1
    },
    max: {
        type: Number,
        default: 100
    },
    onChangeQuantity: {
        type: Function,
        default: () => {}
    },
})

const quantity = defineModel({
    type: Number,
    default: 1
});

const increment = () => {
    if(quantity.value >= props.max) return;

    const newValue = quantity.value + 1;
    props.onChangeQuantity(newValue);
};

const decrement = () => {
    if(quantity.value <= props.min) return;

    const newValue = quantity.value - 1;
    props.onChangeQuantity(newValue);
};

const change = (event) => {
    if(event.target.value === '') {
        return;
    }

    if(event.target.value < props.min || event.target.value > props.max){
        event.target.value = parseInt(quantity.value);
        return;
    }

    const newValue = parseInt(event.target.value);
    props.onChangeQuantity(newValue);
}

const reset = (event) => {
    if(event.target.value === '') {
        event.target.value = parseInt(quantity.value);
    }
};

</script>