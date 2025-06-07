import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useGenreStore } from './useGenresStore';
import { useCategoriesStore } from './useCategoriesStore';

const genreStore = useGenreStore();
const categoryStore = useCategoriesStore();

export const useFiltersStore = defineStore('filters', () => {
    const categoryFilter = ref([]);
    const genreFilter = ref(null);
    const searchFilter = ref('');

    const setCategory = (categoryId) => {  
        categoryFilter.value = categoryFilter.value.includes(categoryId) 
            ? categoryFilter.value.filter(id => id !== categoryId) 
            : [...categoryFilter.value, categoryId]; 
    }

    const setGenre = (genreId) => {
        genreFilter.value = genreId;
    }

    const setSearch = (search) => {
        searchFilter.value = search;
    }

    const resetFilters = () => {
        categoryFilter.value = [];
        genreFilter.value = null;
        searchFilter.value = '';
    }

    watch(genreFilter, (newGenreId) => {
        genreStore.checkGenre(newGenreId);
    })

    watch(categoryFilter, (newCategoryIds) => {
        categoryStore.checkCategory(newCategoryIds);
    });

    return {
        categoryFilter,
        genreFilter,
        searchFilter,
        setCategory,
        setGenre,
        setSearch,
        resetFilters
    };
})