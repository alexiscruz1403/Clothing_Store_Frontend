<template>
    <div class="flex items-center gap-2 w-full justify-center">
        <LoaderCircle class="animate-spin"/>
        <p class="text-[#2E2E2E]">{{ message }}</p>
    </div>
</template>
<script setup>

import { LoaderCircle } from 'lucide-vue-next';

const props = defineProps({
    message: {
        type: String,
        default: 'Cargando...'
    }
})

</script>