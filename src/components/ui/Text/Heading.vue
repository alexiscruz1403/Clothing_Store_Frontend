<template>
    <h1 v-if="props.level == 1" class="text-center text-3xl font-bold">{{ props.label }}</h1>
    <h2 v-else-if="props.level == 2" class="text-xl font-semibold">{{ props.label }}</h2>
    <h3 v-else-if="props.level == 3" class="text-lg font-medium">{{ props.label }}</h3>
    <h4 v-else class="text-center text-base font-normal">{{ props.label }}</h4>
</template>
<script setup>

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    }
});

</script>