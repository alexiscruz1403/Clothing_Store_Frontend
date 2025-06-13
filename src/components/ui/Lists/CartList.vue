<template>
    <div class="bg-white rounded-lg shadow-md flex flex-col py-2 px-4 divide-y divide-gray-300 w-[90%] md:w-max lg:w-max">
        <CartItemCard v-for="product in products" 
            :key="product.id" 
            :product_id="product.product_id" 
            :product_image="product.product_image"
            :product_name="product.product_name"
            :product_brand="product.product_brand"
            :product_size="product.product_size"
            :product_price="product.product_price"
            :product_quantity="product.product_quantity"
            :product_stock="product.product_stock"
        />
    </div>
</template>
<script setup>

import CartItemCard from '../Cards/CartItemCard.vue';

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});

</script>