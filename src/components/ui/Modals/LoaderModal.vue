<template>
    <div class="bg-black/80  h-screen w-screen flex items-center justify-center gap-2 fixed top-0 left-0 z-50">
        <Loader color="white" size="30" class="animate-spin"/>
        <p class="text-2xl text-white">{{ props.content }}</p>
    </div>
</template>
<script setup>

import { Loader } from 'lucide-vue-next';

const props = defineProps({
    content:{
        type: String,
        default: 'Por favor espere mientras carga la consulta'
    }
});

</script>