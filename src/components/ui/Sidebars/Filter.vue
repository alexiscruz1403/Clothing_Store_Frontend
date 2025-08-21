<template>
    <div class="bg-white w-full lg:w-64 rounded-lg shadow-md p-4 flex flex-col gap-2 text-[#2E2E2E] font-['Nunito'] max-h-max lg:sticky lg:top-5">
        <Heading 
            label="Filtros" 
            :level="2"
        />
        <div class="flex flex-row md:flex-col justify-between md:justify-start px-12 md:pl-2 lg:flex-col md:gap-3 lg:gap-3">
            <div class="flex flex-col md:flex-row lg:flex-col gap-2 md:gap-5 lg:gap-2">
                <Heading 
                    label="Géneros" 
                    :level="3"
                />
                <div class="flex flex-col md:flex-row lg:flex-col gap-1 md:gap-3 lg:gap-1">
                    <Radio v-for="genre in genres" 
                        name="genres" 
                        :id="genre.genre_name" 
                        :key="genre.name" 
                        :label="genre.genre_name" 
                        :checked="genre.genre_name == genreFilter"
                        @click="handleFilterGenreClick(genre.genre_name)" 
                    />
                </div>
            </div>
            <div class="flex flex-col md:flex-row lg:flex-col gap-2 md:gap-5 lg:gap-2">
                <Heading 
                    label="Categorías" 
                    :level="3"
                />
                <div class="flex flex-col md:flex-row lg:flex-col gap-1 md:gap-3 lg:gap-1">
                    <Checkbox v-for="category in categories" 
                        :id="category.category_name" 
                        :label="category.category_name" 
                        @click="handleFilterCategoryClick(category.category_name)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import Checkbox from '../Inputs/Checkbox.vue';
import Radio from '../Inputs/Radio.vue';
import { useGenreStore } from '@/stores/useGenresStore';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useFiltersStore } from '@/stores/useFiltersStore';
import { storeToRefs } from 'pinia';
import { defineEmits } from 'vue';
import Heading from '../Text/Heading.vue';

const genreStore = useGenreStore();
const { genres } = storeToRefs(genreStore);

const categoriesStore = useCategoriesStore();
const { categories } = storeToRefs(categoriesStore);

const filtersStore = useFiltersStore();
const { genreFilter } = storeToRefs(filtersStore);

const emit = defineEmits(['filters-changed']);

const handleFilterGenreClick = (genreName) => {
    filtersStore.setGenre(genreName);
    emit('filters-changed');   
};

const handleFilterCategoryClick = (categoryName) => {
    filtersStore.setCategory(categoryName);
    emit('filters-changed');
};

</script>