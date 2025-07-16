<template>
    <div class="w-full h-full flex flex-col items-center justify-center gap-5">
        <h1 class="text-center text-3xl font-bold">Mis Favoritos</h1>
        <div class="w-[90%]">
            <SearchBar @search-changed="handleFiltersChanged"/>
        </div>
        <div class="w-[90%] flex flex-col gap-5 lg:flex-row">
            <Filter @filters-changed="handleFiltersChanged"/>
            <ProductList :products="favorites" :matches="matches" @fetch-products="fetchFavorites" :available-products="availableFavorites"/>
        </div>
    </div>
</template>
<script setup>

import SearchBar from '@/components/ui/Inputs/SearchBar.vue';
import Filter from '@/components/ui/Sidebars/Filter.vue';
import ProductList from '@/components/ui/Lists/ProductList.vue';
import {  ref, onMounted, provide } from 'vue';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave } from 'vue-router';

const favoritesStore = useFavoritesStore();
const { favorites, matches, availableFavorites } = storeToRefs(favoritesStore);

const loading = ref(true);
provide('loading', loading);

const timeout = ref(null);

const fetchFavorites = async () => {
    loading.value = true;
    try{
        await favoritesStore.fetchFavorites();
    }catch(error){
        console.error("Error fetching products:", error);
    }finally{
        loading.value = false;
    }
};

const handleFiltersChanged = () => {
    if(timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(() => {
        favoritesStore.clearFavorites();
        fetchFavorites();
    }, 500);
};

onBeforeRouteLeave((to, from, next) => {
    favoritesStore.clearFavorites();
    next();
})

onMounted(async () => {
    fetchFavorites();
});

</script>