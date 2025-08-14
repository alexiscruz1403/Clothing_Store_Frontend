<template>
    <div class="h-screen flex items-center justify-center">
        <div class="flex gap-2">
            <Loader2 class="animate-spin" size="28"/>
            <p class="text-xl">Espere mientras se carga la página por favor...</p>
        </div>
    </div>
</template>
<script setup>

import { Loader2 } from 'lucide-vue-next';

</script>