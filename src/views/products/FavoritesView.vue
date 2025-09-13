<template>
    <div class="w-full h-full flex flex-col items-center justify-center gap-5">
        <div class="w-[90%] flex justify-between">
            <Heading
                label="Mis favoritos"
                :level="1" 
            />
            <Linker 
                label="Volver al inicio" 
                @click="handleLinkerClick"
            />
        </div>
        <div class="w-[90%]">
            <SearchBar @search-changed="handleFiltersChanged"/>
        </div>
        <div class="w-[90%] flex flex-col gap-5 lg:flex-row">
            <Filter @filters-changed="handleFiltersChanged"/>
            <ProductList 
                :products="favorites" 
                :matches="matches"
                :available-products="availableFavorites"
                @fetch-products="fetchFavorites"
            />
        </div>
    </div>
</template>
<script setup>

import Heading from '@/components/ui/Text/Heading.vue';
import Linker from '@/components/ui/Buttons/Linker.vue';
import SearchBar from '@/components/ui/Inputs/SearchBar.vue';
import Filter from '@/components/ui/Sidebars/Filter.vue';
import ProductList from '@/components/ui/Lists/ProductList.vue';
import {  ref, onMounted, provide } from 'vue';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave } from 'vue-router';
import router from '@/router';

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
        if(error.response && error.response.status === 401) router.push({ name: 'login' });
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

const handleLinkerClick = () => {
    router.push({ name: 'home' });
};

onBeforeRouteLeave((to, from, next) => {
    favoritesStore.clearFavorites();
    next();
})

onMounted(async () => {
    await fetchFavorites();
});

</script>