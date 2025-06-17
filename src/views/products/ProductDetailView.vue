<template>
    <Header />
    <main class="bg-[#E8DCCB] text-[#2E2E2E] font-['Nunito'] py-4">
        <Suspense>
            <Error v-if="hasError" message="No se pudo cargar el producto. Por favor, intente más tarde." />
            <div v-else class="flex lg:justify-center">
                <div class="flex flex-col gap-4 w-screen lg:max-w-max px-4">
                    <a href="/products" class="flex items-center gap-1 cursor-pointer py-1">
                        <ArrowLeft class="text-[#4F4F4F] text-xs"/>
                        <span class="text-[#4F4F4F] text-sm">Volver a productos</span>
                    </a>
                    <AsyncProductDetail
                        :product_id="product.product_id"
                        :product_images="product.product_images"
                        :product_name="product.product_name"
                        :product_brand="product.product_brand"
                        :product_description="product.product_description"
                        :product_price="product.product_price"
                        :product_sizes="product.product_sizes"
                        :product_is_in_favorites="product.product_is_in_favorites"
                    />
                    <div class="flex flex-col gap-4 max-w-full">
                        <h2 class="text-xl font-medium">Productos relacionados</h2>
                        <div class="w-full overflow-x-auto">
                            <div class="flex gap-4 w-max">
                                <RelatedProductCard
                                    v-for="product in relatedProducts"
                                    :key="product.product_id"
                                    :product_id="product.product_id"
                                    :product_image="product.product_image"
                                    :product_name="product.product_name"
                                    :product_price="product.product_price"
                                    :product_is_in_favorites="product.product_is_in_favorites"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #fallback>
                <Loader message="Cargando detalles del producto, por favor espere." />
            </template>
        </Suspense> 
    </main>
    <Footer />
</template>
<script setup>

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import RelatedProductCard from '@/components/ui/Cards/RelatedProductCard.vue';
import Loader from '@/components/ui/Loader/Loader.vue';
import Error from '@/components/ui/Messages/Error.vue';
import { ArrowLeft } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { useDetailStore } from '@/stores/useDetailStore';
import { storeToRefs } from 'pinia';
import { ref, onBeforeMount, defineAsyncComponent } from 'vue';

const route = useRoute();
const productId = route.params.id;

const detailStore = useDetailStore();
const { product, relatedProducts } = storeToRefs(detailStore);

const hasError = ref(false);

const AsyncProductDetail = defineAsyncComponent({
    loader: () => import('@/components/ui/Cards/ProductDetail.vue'),
    loadingComponent: Loader,
    errorComponent: Error,
    delay: 200,
    timeout: 5000,
    suspensible: true
})

onBeforeMount(async () => {
    await detailStore.fetchProduct(productId);

    if(!product.value){
        hasError.value = true;
    }
});

</script>