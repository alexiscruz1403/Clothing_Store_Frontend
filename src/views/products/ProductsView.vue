<template>
    <div class="w-full h-full flex flex-col items-center justify-center gap-5">
        <h1 class="text-center text-3xl font-bold">Nuestra colección</h1>
        <div class="w-[90%]">
            <SearchBar @search-changed="handleFiltersChanged"/>
        </div>
        <div class="w-[90%] flex flex-col gap-5 lg:flex-row lg:justify-between">
            <Filter @filters-changed="handleFiltersChanged"/>
            <ProductList :products="products" :matches="matches" @fetch-products="fetchProducts" :available-products="availableProducts"/>
        </div>
    </div>
</template>
<script setup>

import SearchBar from '@/components/ui/Inputs/SearchBar.vue';
import Filter from '@/components/ui/Sidebars/Filter.vue';
import ProductList from '@/components/ui/Lists/ProductList.vue';
import { ref, onMounted, provide } from 'vue';
import { useProductsStore } from '@/stores/useProductsStore';
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave } from 'vue-router';

const productsStore = useProductsStore();
const { products, matches, availableProducts } = storeToRefs(productsStore);

const loading = ref(true);
provide('loading', loading);

const timeout = ref(null);

const fetchProducts = async () => {
    loading.value = true;
    try{
        await productsStore.fetchProducts();
    }catch(error){
        console.error("Error fetching products:", error);
    }finally{
        loading.value = false;
    }
};

const handleFiltersChanged = () => {
    if(timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(() => {
        productsStore.clearProducts();
        fetchProducts();
    }, 500);
};

onBeforeRouteLeave((to, from, next) => {
    productsStore.clearProducts();
    next();
})

onMounted(async () => {
    fetchProducts();
});

</script>