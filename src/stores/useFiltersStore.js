import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('filters', () => {
    const filters = ref({
        category: null,
        genre:null,
        search: ''
    })

    const setCategory = (category) => {
        filters.value.category = category;
    }

    const setGenre = (genre) => {
        filters.value.genre = genre;
    }

    const setSearch = (search) => {
        filters.value.search = search;
    }

    const resetFilters = () => {
        setCategory(null);
        setGenre(null);
        setSearch('');
    }

    return {
        filters,
        setCategory,
        setGenre,
        setSearch,
        resetFilters
    };
})