<template>
    <div class="w-full h-full flex flex-col items-center justify-center gap-5">
        <h1 class="text-center text-3xl font-bold">Nuestra colección</h1>
        <div class="w-[90%]">
            <SearchBar />
        </div>
        <div class="w-[90%] flex flex-col gap-5 lg:flex-row lg:justify-between">
            <Filter/>
            <Suspense>
                <Error v-if="hasError" :message="errorMessage"/>
                <AsyncProductList v-else :products="products"/>
                <template #fallback>
                    <Loader message="Cargando productos, por favor espere."/>
                </template>
            </Suspense>
        </div>
    </div>
</template>
<script setup>

import SearchBar from '@/components/ui/Inputs/SearchBar.vue';
import Filter from '@/components/ui/Sidebars/Filter.vue';
import Loader from '@/components/ui/Loader/Loader.vue';
import Error from '@/components/ui/Messages/Error.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useProductsStore } from '@/stores/useProductsStore';
import { storeToRefs } from 'pinia';

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

const hasError = ref(false);
const errorMessage = ref('Ha ocurrido un error, por favor intente más tarde.');

const AsyncProductList = defineAsyncComponent({
    loader: () => import('@/components/ui/Lists/ProductList.vue'),
    loadingComponent: Loader,
    errorComponent: Error,
    delay: 200,
    timeout: 5000,
    suspensible: true
});

onMounted(async () => {
   await productsStore.fetchProducts();
    
    if (products.value.length <= 0) {
        hasError.value = true;
        errorMessage.value = 'No se encontraron productos.';
    }
});

</script>