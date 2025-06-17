<template>
    <Header />
    <main class="min-h-screen py-5 bg-[#E8DCCB] text-[#2E2E2E] font-['Nunito'] w-full flex flex-col items-center gap-5">
        <h1 class="text-center text-3xl font-bold">Mis Favoritos</h1>
        <div class="w-[90%]">
            <SearchBar />
        </div>
        <div class="w-[90%] flex flex-col gap-5 lg:flex-row">
            <Filter/>
            <Suspense>
                <Error v-if="hasError" :message="errorMessage"/>
                <AsyncFavoritesList v-else :products="favorites" empty-message="Aún no has agregado productos como favoritos"/>
                <template #fallback>
                    <Loader message="Cargando productos, por favor espere."/>
                </template>
            </Suspense>
        </div>
    </main>
    <Footer />
</template>
<script setup>

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import SearchBar from '@/components/ui/Inputs/SearchBar.vue';
import Filter from '@/components/ui/Sidebars/Filter.vue';
import Loader from '@/components/ui/Loader/Loader.vue';
import Error from '@/components/ui/Messages/Error.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { storeToRefs } from 'pinia';

const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);

const hasError = ref(false);
const errorMessage = ref('Ha ocurrido un error, por favor intente más tarde.');

const AsyncFavoritesList = defineAsyncComponent({
    loader: () => import('@/components/ui/Lists/ProductList.vue'),
    loadingComponent: Loader,
    errorComponent: Error,
    delay: 200,
    timeout: 5000,
    suspensible: true
});

onMounted(async () => {
   await favoritesStore.fetchFavorites();
});

</script>