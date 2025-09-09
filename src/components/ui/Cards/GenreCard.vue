<template>
    <div class="bg-[#A89272] hover:bg-[#7E6E56] active:bg-[#3A3227] h-52 md:h-60 lg:h-72 w-full cursor-pointer text-[#2E2E2E] font-[DMSans] relative rounded-lg transition-colors duration-300 flex items-center justify-center overflow-hidden pt-4" @click="handleCardClick">
        <img :src="props.genreImage" alt="" class="h-full">
        <div class="py-3 px-2 absolute top-0 left-0 w-full">
            <p class="text-lg md:text-base lg:text-xl">{{ text }}</p>
        </div>
    </div>
</template>
<script setup>

import { computed } from 'vue'
import { useFiltersStore } from '@/stores/useFiltersStore';
import router from '@/router';

const props = defineProps({
    genreId: {
        type: Number,
        required: true
    },
    genreName: {
        type: String,
        required: true
    },
    genreImage: {
        type: String,
        required: true
    }
})

const text = computed(() => {
    return `Ropa para ${props.genreName}`
})

const filtersStore = useFiltersStore();

const handleCardClick = () => {
    filtersStore.setGenre(props.genreName);
    router.push({ name: 'products' });
}

</script>