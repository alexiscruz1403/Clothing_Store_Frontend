<template>
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <ProductCard v-for="product in props.products"
            :product_image="product.product_image"
            :product_name="product.product_name"
            :product_brand="product.product_brand"
            :product_description="product.product_description"
            :product_price="product.product_price"
            :product_is_in_cart="product.product_is_in_cart"
            :product_is_in_favorites="product.product_is_in_favorites"
        />
    </div>
</template>
<script setup>

import ProductCard from '../Cards/ProductCard.vue';

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
})

</script>