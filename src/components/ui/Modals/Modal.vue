<template>
    <div :class="modalClass">
        <div class="bg-white flex flex-col gap-2 px-4 py-10 rounded-lg">
            <h1 class="font-bold text-[#2E2E2E] text-xl text-center">{{ props.title }}</h1>
            <div class="flex gap-2">
                <LoaderCircle v-if="props.type === 'waiting'" class="w-6 h-6 animate-spin text-gray-500" />
                <Check v-if="props.type === 'success'" class="w-6 h-6 text-green-500" />
                <CircleX v-if="props.type === 'error'" class="w-6 h-6 text-red-500" />
                <p :class="descriptionClass">{{ props.description }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>

import { LoaderCircle, Check, CircleX } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'default' // default, success, error, waiting
    },
    visibility: {
        type: Boolean,
        default: false
    }
});

const descriptionClass = computed(() => {
    if(props.type === 'waiting') return 'text-[#2E2E2E]';
    if (props.type === 'success') return 'text-green-500';
    if (props.type === 'error') return 'text-red-500';
});

const modalClass = computed(() => {
    const baseClass = 'bg-black/50 h-screen w-screen flex justify-center items-center fixed top-0 left-0';
    return props.visibility ? baseClass : `${baseClass} hidden`;
});

</script>