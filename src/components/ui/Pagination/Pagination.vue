<template>
    <div class="flex gap-3">
        <div class="items-center gap-1 hidden md:flex">
            <PaginationButton 
                v-for="button in leftButtons"
                :key="button.label"
                :label="button.label"
                :icon="button.icon"
                :value="button.value"
                :disabled="button.disabled"
                :selected="button.selected"
                @click="handleUrlClick"
            />
        </div>
        <div class="flex items-center gap-1">
            <PaginationButton 
                v-for="button in buttons"
                :key="button.label"
                :label="button.label"
                :value="button.value"
                :disabled="button.disabled"
                :selected="button.selected"
                @click="handlePageClick"
            />
        </div>
        <div class="hidden md:flex items-center gap-1">
            <PaginationButton 
                v-for="button in rightButtons"
                :key="button.label"
                :label="button.label"
                :icon="button.icon"
                :value="button.value"
                :disabled="button.disabled"
                :selected="button.selected"
                @click="handleUrlClick"
            />
        </div>
    </div>
</template>
<script setup>

import { computed, defineEmits } from 'vue';
import PaginationButton from '../Buttons/PaginationButton.vue';

const props = defineProps({
    current: {
        type: Number,
        required: true
    },
    last: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['page-change']);

const leftButtons = computed(() => {
    return [
        { label: 'Inicio', disabled: props.current === 1, value: 'first' },
        { label: '', disabled: props.current === 1, icon: 'prev', value: 'prev' }
    ];
});

const rightButtons = computed(() => {
    return [
        { label: '', disabled: props.current === props.last, icon: 'next', value: 'next' },
        { label: 'Fin', disabled: props.current === props.last, value: 'last' }
    ];
});

const buttons = computed(() => {
    const buttons = [];
    let start = 0;

    if(props.current == props.last){
        start = props.last - 4 < 1 ? 1 : props.last - 4;
    }else if(props.last - props.current < 2){
        start = props.last - 4 < 1 ? 1 : props.last - 4;
    }else{
        start = props.current - 2 < 1 ? 1 : props.current - 2;
    }

    while(start <= props.last && buttons.length < 5){
        buttons.push({
            label: start,
            value: start,
            selected: start === props.current
        });
        start++;
    }

    return buttons;
});

const handlePageClick = (page) => {
    if(page !== props.current && page > 0 && page <= props.last){
        emit('page-change', { page });
    }
}

const handleUrlClick = (url) => {
    if(url && url !== '#'){
        emit('page-change', { url });
    }
}

</script>