<template>
    <div class="flex lg:justify-center">
        <div class="flex flex-col gap-4 w-screen lg:max-w-max px-4">
            <Linker label="Volver a productos" @click="handleLinkerClick"/>
            <ProductDetail
                :product_id="computedProduct.product_id"
                :product_images="computedProduct.images"
                :product_name="computedProduct.product_name"
                :product_brand="computedProduct.product_brand"
                :product_description="computedProduct.product_description"
                :product_price="computedProduct.product_price"
                :product_sizes="computedProduct.stocks"
                :product_is_in_favorites="computedProduct.product_is_in_favorites"
            />
            <div class="flex flex-col gap-4 max-w-full">
                <Heading 
                    label="Productos relacionados"
                    :level="2"
                />
                <div class="w-full overflow-x-auto">
                    <div class="flex gap-4 w-max">
                        <RelatedProductCard
                            v-for="product in computedRelatedProducts"
                            :key="product.product_id"
                            :product_id="product.product_id"
                            :product_image="product.product_image"
                            :product_name="product.product_name"
                            :product_brand="product.product_brand"
                            :product_price="product.product_price"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import Linker from '@/components/ui/Buttons/Linker.vue';
import Heading from '@/components/ui/Text/Heading.vue';
import RelatedProductCard from '@/components/ui/Cards/RelatedProductCard.vue';
import ProductDetail from '@/components/ui/Cards/ProductDetail.vue';
import { useRoute } from 'vue-router';
import { useDetailStore } from '@/stores/useDetailStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed, provide } from 'vue';

const route = useRoute();
const productId = route.params.id;

const detailStore = useDetailStore();
const { product, relatedProducts } = storeToRefs(detailStore);

const loading = ref(true);
provide('loading', loading);

const computedProduct = computed(() => {
    if(loading.value) return {
        product_id: 0,
        product_name: 'Cargando...',
        product_brand: 'Cargando...',
        product_description: 'Cargando...',
        product_price: 0,
        images: [
            { image_id: 0, image_url: '', is_primary: 1 },
            { image_id: 1, image_url: '', is_primary: 0 }
        ],
        stocks: [
            {product_size: 'X', stock_quantity: 0},
            {product_size: 'X', stock_quantity: 0},
            {product_size: 'X', stock_quantity: 0}
        ],
        product_is_in_favorites: false
    };
    return product.value;
});

const computedRelatedProducts = computed(() => {
    if(loading.value) return [
        {
            product_id: 0,
            product_image: '',
            product_name: 'Cargando...',
            product_brand: 'Cargando...',
            product_price: 0,
        },
        {
            product_id: 0,
            product_image: '',
            product_name: 'Cargando...',
            product_brand: 'Cargando...',
            product_price: 0,
        },
        {
            product_id: 0,
            product_image: '',
            product_name: 'Cargando...',
            product_brand: 'Cargando...',
            product_price: 0,
        },
        {
            product_id: 0,
            product_image: '',
            product_name: 'Cargando...',
            product_brand: 'Cargando...',
            product_price: 0,
        },
        {
            product_id: 0,
            product_image: '',
            product_name: 'Cargando...',
            product_brand: 'Cargando...',
            product_price: 0,
        }
    ];
    return relatedProducts.value;
});

const handleLinkerClick = () => {
    router.push({ name: 'products' });
};

onMounted(async () => {
    await detailStore.fetchProduct(productId);
    loading.value = false;
});

</script>