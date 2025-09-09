<template>
    <div class="bg-[#A89272] hover:bg-[#7E6E56] active:bg-[#3A3227] h-52 md:h-60 lg:h-72 min-w-40 md:w-1/4 cursor-pointer text-[#2E2E2E] font-[DMSans] relative rounded-lg transition-colors duration-300 ease-in-out p-4" @click="handleCardClick">
        <img :src="props.categoryImage" alt="" class="h-5/6 w-full object-cover rounded-t-lg">
        <div class="py-3 px-2 absolute bottom-0 left-0 w-full">
            <p class="text-lg md:text-base lg:text-xl text-center">{{ props.categoryName }}</p>
        </div>
    </div>
</template>
<script setup>

import { useFiltersStore } from '@/stores/useFiltersStore';
import router from '@/router';

const props = defineProps({
    categoryId: {
        type: Number,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    }
})

const filtersStore = useFiltersStore();

const handleCardClick = () => {
    filtersStore.setCategory(props.categoryName);
    router.push({ name: 'products' });
}

</script>