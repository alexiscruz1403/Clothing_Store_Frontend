<template>
    <div class="bg-black/50 h-screen w-screen p-5 flex justify-center items-center fixed top-0 left-0">
        <div class="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-3">
            <h1 class="text-xl text-center font-bold">{{ props.title }}</h1>
            <p>{{ props.content }}</p>
            <div class="flex gap-2">
                <Button 
                    label="Confirmar" 
                    color="confirm"
                    @click="handleConfirm" 
                />
                <Button 
                    label="Cerrar" 
                    color="cancel" 
                    @click="handleClose" 
                />
            </div>
        </div>
    </div>
</template>
<script setup>

import Button from '../Buttons/Button.vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    action: {
        type: String,
        default: 'delete'
    }
})

const emit = defineEmits(['close', 'confirm']);

const handleClose = () => {
    emit('close');
};

const handleConfirm = () => {
    emit('confirm', props.action);
};

</script>