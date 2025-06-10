<template>
    <div class="flex flex-col w-full">
        <div class="flex items-center justify-between pb-5">
            <h2 class="text-xl">Productos</h2>
            <p class="text-[#4F4F4F]">10 productos encontrados</p>
        </div>
        <div v-if="props.products.length === 0" class="w-full h-20 lg:h-full flex justify-center items-center">
            <p class="text-lg text-center">{{ props.emptyMessage }}</p>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            <ProductCard v-for="product in props.products"
                :key="product.product_id"
                :product_id="product.product_id"
                :product_image="product.product_image"
                :product_name="product.product_name"
                :product_brand="product.product_brand"
                :product_description="product.product_description"
                :product_price="product.product_price"
                :product_is_in_cart="product.product_is_in_cart"
                :product_is_in_favorites="product.product_is_in_favorites"
            />
        </div>
    </div>
</template>
<script setup>

import ProductCard from '../Cards/ProductCard.vue';

const props = defineProps({
    products: {
        type: Array,
        required: true
    },
    emptyMessage: {
        type: String,
        default: 'No hay productos disponibles'
    }
})

</script>