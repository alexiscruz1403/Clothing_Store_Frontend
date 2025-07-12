import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('filters', () => {
    const categoryFilter = ref([]);
    const genreFilter = ref(null);
    const searchFilter = ref(null);

    const setCategory = (categoryName) => {  
        categoryFilter.value = categoryFilter.value.includes(categoryName) 
            ? categoryFilter.value.filter(category => category  !== categoryName) 
            : [...categoryFilter.value, categoryName]; 
    }

    const setGenre = (genreName) => {
        genreFilter.value = genreName;
    }

    const setSearch = (search) => {
        searchFilter.value = search;
    }

    const resetFilters = () => {
        categoryFilter.value = [];
        genreFilter.value = null;
        searchFilter.value = '';
    }

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