<template>
    <div class="flex items-center justify-center w-full gap-1 text-[#C0392B]">
        <CircleX size="28"/>
        <p class="text-xl">{{ props.message }}</p>
    </div>
</template>
<script setup>

import { CircleX } from 'lucide-vue-next';

const props = defineProps({
    message: {
        type: String,
        default: 'Ha ocurrido un error, por favor intente más tarde.'
    }
});

</script>