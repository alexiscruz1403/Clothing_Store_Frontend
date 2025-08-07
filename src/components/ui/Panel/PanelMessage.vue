<template>
    <div :class="statusClasses">
        <div class="flex items-center gap-2">
            <Check v-if="status === 'success'" class="text-green-500" />
            <X v-else-if="status === 'error'" class="text-red-500" />
            <p>{{ props.message }}</p>
        </div>
    </div>
</template>
<script setup>

import { Check, X } from 'lucide-vue-next';
import { defineProps, computed } from 'vue';

const props = defineProps({
    status: {
        type: String,
        default: 'success'
    },
    message: {
        type: String,
        default: ''
    },
});

const statusClasses = computed(() => {
    const baseClass = 'p-2 rounded-lg text-sm w-full';
    switch (props.status) {
        case 'success':
            return `${baseClass} bg-green-100 text-green-800`;
        case 'error':
            return `${baseClass} bg-red-100 text-red-800`;
    }
});

</script>