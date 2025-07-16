<template>
    <div :class="listClass">
        <CartItemCard v-for="product in computedProducts" 
            :key="product.product_id" 
            :product_id="product.product_id" 
            :product_image="product.image.image_url"
            :product_name="product.product_name"
            :product_brand="product.product_brand"
            :product_size="product.stock.product_size"
            :product_price="product.product_price"
            :product_quantity="product.product_quantity"
            :product_stock="product.stock.stock_quantity"
        />
    </div>
</template>
<script setup>

import CartItemCard from '../Cards/CartItemCard.vue';
import { computed, inject } from 'vue';
import { bgLoadingCLass } from '@/consts/loadingClasses';

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});

const loading = inject('loading');

const listClass = computed(() => {
    const baseClass = "rounded-lg shadow-md flex flex-col py-2 px-4 divide-y divide-gray-300 w-[90%] md:w-max lg:w-max";
    return loading.value ? `${baseClass} ${bgLoadingCLass}` : `${baseClass} bg-white`;
});

const computedProducts = computed(() => {
    if(loading.value) return [{
        product_id: 0,
        image: { image_url: '' },
        product_name: 'Cargando nombre',
        product_brand: 'Cargando marca',
        stock: { product_size: 'Cargando talla', stock_quantity: 0 },
        product_price: 0,
        product_quantity: 1
    }];

    return props.products;
});

</script>